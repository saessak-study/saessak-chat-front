import React, { useCallback, useEffect, useState } from 'react';
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
  const { data: userData, mutate } = useSWR(
    'http://35.216.19.135:8080/online-user',
    fetcher,
    {
      refreshInterval: 2000,
    },
  );
  const [chatInput, setChatInput] = useState('');
  const [helloUser, setHelloUser] = useState([]);
  const [chatData, setChatData] = useState([]);

  const logOutAction = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.clear();
      console.log('로그아웃입니당');
      navigate('/');
    } else return;
  };

  const onSubmitMessage = useCallback(() => {
    const TODAY = new Date().toISOString().split('T')[0];
    let body = {
      targetDate: TODAY,
    };
    const sockJs = new SockJS(`http://35.216.19.135:8080/chat/${userId}`);
    sockJs.onopen = function () {
      sockJs.send(chatInput);
      console.log('보내짐');
      axios.post('/chat-history', body).then((response) => {
        setChatData(response.data.responseMessage);
      });

      sockJs.onmessage = function () {
        axios.post('/chat-history', body).then((response) => {
          setChatData(response.data.responseMessage);
        });
      };
    };
    setChatInput('');
  }, [chatInput, userId]);

  const onChange = (e) => {
    setChatInput(e.target.value);
  };

  /**
   * * 화면 렌더링 됐을 때 sock연결 하는 거
   */

  // useEffect(() => {
  //   const TODAY = new Date().toISOString().split('T')[0];
  //   let body = {
  //     targetDate: TODAY,
  //   };
  //   axios.post('/chat-history', body).then((response) => {
  //     setChatData(response.data.responseMessage);
  //   });
  // }, [onSubmitMessage]);

  useEffect(() => {
    const sock = new SockJS(`http://35.216.19.135:8080/chat/${userId}`);
    sock.onopen = function () {
      console.log('sock 연결됐다.');

      sock.onmessage = function () {
        axios.post('/chat-history', body).then((response) => {
          setChatData(response.data.responseMessage);
        });
      };
    };
    const TODAY = new Date().toISOString().split('T')[0];
    let body = {
      targetDate: TODAY,
    };

    axios.post('/chat-history', body).then((response) => {
      setChatData(response.data.responseMessage);
      mutate();
    });
  }, []);

  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className={styles.mainPage}>
      <div className={styles.left_container}>
        <div className={styles.main_logo}>🌱SaessakChat🌱</div>
        <div className={styles.user_container}>
          <div className={styles.user_online}>🖐현재 접속중인 유저</div>
          <div className={styles.user_status_container}>
            {userData &&
              userData.responseMessage.map((user) => (
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
          <div className={styles.chatlog_stack}>
            {chatData &&
              chatData.map((item, index) => (
                <ChatLog
                  key={index}
                  userName={item.userName}
                  chatFromMe={item.userId}
                  chatMessage={item.message}
                  chatDate={item.sendTime}
                />
              ))}
          </div>
        </div>
        <div className={styles.chatInput_container}>
          <input
            className={styles.chatInput}
            onChange={onChange}
            value={chatInput}
            type="text"
          ></input>
          <div
            className={styles.chatInput_send}
            onClick={() => onSubmitMessage()}
          >
            전송
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
