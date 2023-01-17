import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatLog from '../components/HomePage/ChatLog';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

const HomePage = () => {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  /**
   * * 주기적을 요청보내는 코드
   */
  // const {
  //   data: userData,
  //   error,
  //   isLoading,
  //   isValidating,
  //   mutate,
  // } = useSWR('http://35.216.19.135:8080/online-user', fetcher, {
  //   dedupingInterval: 5000,
  // });
  const [helloUser, setHelloUser] = useState('');

  const [sockJs, setSockJs] = useState(null);
  const [onlineUser, setOnlineUser] = useState(null);

  const logOutAction = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.clear();
      window.location.reload();
      navigate('/');
    } else return;
  };

  /**
   * * 화면 렌더링 됐을 때 sock연결 하는 거
   */
  useEffect(() => {
    const sock = new SockJS(`http://35.216.19.135:8080/chat/${userId}`);
    sock.onmessage = function (e) {
      let hello = JSON.parse(e.data);
      setHelloUser(hello);
      console.log(hello);
      setSockJs(sock);
    };

    axios.get('http://35.216.19.135:8080/online-user').then((response) => {
      console.log(response);
    });
  }, []);

  // useEffect(() => {
  //   mutate();
  //   setOnlineUser(userData);
  // }, [userData]);

  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);
  // const chatDate = new Date().toLocaleString();
  return (
    <div className={styles.mainPage}>
      <div className={styles.left_container}>
        <div className={styles.main_logo}>🌱SaessakChat🌱</div>
        <div className={styles.user_container}>
          <div className={styles.user_online}>🖐현재 접속중인 유저</div>
          <div className={styles.user_status_container}>
            {onlineUser &&
              onlineUser.responseMessage.map((user) => (
                <ChkUserOnline
                  key={user.userId}
                  userName={user.userName}
                  userOnline={user.isOnline}
                />
              ))}
          </div>
        </div>
        <div className={styles.user_logout} onClick={logOutAction}>
          🚪로그아웃하기
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.chatlog_container}>
          <div className={styles.chatlog_stack} id="chatlog_stack"></div>
        </div>
        <div className={styles.chatInput_container}>
          <input className={styles.chatInput}></input>
          <div className={styles.chatInput_send}>전송</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
