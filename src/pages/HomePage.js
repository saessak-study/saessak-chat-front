import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatLog from '../components/HomePage/ChatLog';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import axios from 'axios';
import * as SockJS from 'sockjs-client';
import InputTest from '../components/HomePage/InputTest';

const HomePage = () => {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  const { data: userData, mutate } = useSWR(
    'http://35.216.19.135:8080/online-user',
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const [chatData, setChatData] = useState([]);
  const [sockJs, setSockJs] = useState('');

  const logOutAction = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sockJs.send(`${userId}님이 퇴장하셨습니다. Good Bye!`);
      localStorage.clear();
      console.log('로그아웃입니당');
      navigate('/');
    } else return;
  };

  useEffect(() => {
    const sock = new SockJS(`http://35.216.19.135:8080/chat/${userId}`);

    sock.onopen = function () {
      sock.send(`${userId}님이 입장하셨습니다. Hello!`);
      setSockJs(sock);
      mutate();

      sock.onmessage = function (e) {
        axios.get('/chat-history').then((response) => {
          setChatData(response.data.responseMessage);
        });
      };
    };
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
              userData.responseMessage
                .sort((a, b) => {
                  return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
                })
                .map((user) => (
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
            {chatData ? (
              chatData.map((item, index) => (
                <ChatLog
                  key={index}
                  userName={item.userName}
                  chatFromMe={item.userId}
                  chatMessage={item.message}
                  chatDate={item.sendTime}
                />
              ))
            ) : (
              <div>아직 데이터가 없어유 수정해보아유</div>
            )}
          </div>
        </div>
        <InputTest sockJs={sockJs} setChatData={setChatData} />
      </div>
    </div>
  );
};

export default HomePage;
