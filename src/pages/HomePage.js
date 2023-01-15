import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatLog from '../components/HomePage/ChatLog';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';
import chatlog from '../constants/chatlog.json';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR('http://35.216.19.135:8080/online-user', fetcher);

  const [isBlocking, setIsBlocking] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [user, setUser] = useState('');
  const [chatFromMe, setChatFromMe] = useState(false);

  /**
   * ^채팅창에 적은 글을 state에 저장하는 함수
   * @param {e} e
   * @param {string} chatMessage
   * @param {string} user
   */
  const inputChange = (e, chatMessage, user) => {
    setChatMessage(e.target.value);
    console.log(chatlog);
  };

  /**
   * TODO 로그아웃 함수 추가할 것,
   * TODO 로그아웃 시  localstorage 초기화.
   */

  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (!userInfo) {
      navigate('/');
    }
  }, []);

  const logOutAction = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.clear();
      navigate('/');
    } else {
      return;
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.left_container}>
        <div className={styles.main_logo}>🌱SaessakChat🌱</div>
        <div className={styles.user_container}>
          <div className={styles.user_online}>🖐현재 접속중인 유저</div>
          <div className={styles.user_status_container}>
            <ChkUserOnline userName={'정길웅'} userOnline={true} />
            <ChkUserOnline userName={'박아연'} userOnline={false} />
            <ChkUserOnline userName={'김필'} userOnline={false} />
            <ChkUserOnline userName={'가나다라'} userOnline={false} />
          </div>
        </div>
        <div className={styles.user_logout} onClick={logOutAction}>
          🚪로그아웃하기
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.chatlog_container}>
          <div className={styles.chatlog_stack} id="chatlog_stack">
            {chatlog.map((chat, i) => {
              const chatDate = new Date().toLocaleString();
              return (
                <ChatLog
                  key={i}
                  chatFromMe={chat.chatFromMe}
                  userName={chat.userName}
                  chatMessage={chat.chatMessage}
                  chatDate={chatDate}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.chatInput_container}>
          <input className={styles.chatInput} onChange={inputChange}></input>
          <div className={styles.chatInput_send}>전송</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
