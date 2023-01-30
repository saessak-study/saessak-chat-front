import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatLog from '../components/HomePage/ChatLog';
import LoginMessage from '../components/HomePage/LoginMessage';
import InputBox from '../components/HomePage/InputBox';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import axios from 'axios';
import * as SockJS from 'sockjs-client';

const HomePage = () => {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const { data: userData } = useSWR(
    'http://35.216.19.135:8080/online-user',
    fetcher,
    {
      refreshInterval: 2000,
    },
  );

  const [chatData, setChatData] = useState([]);
  const [sockJs, setSockJs] = useState();

  const logOutAction = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      sockJs.close();
      localStorage.clear();
      console.log('로그아웃입니당');
      navigate('/');
    } else return;
  };

  const getTodayChattingHistory = async () => {
    let today = new Date();
    let body = {
      targetDate: `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${
        today.getMonth() + 1
      }-${today.getDate()}`,
    };
    let response = await axios
      .post('/chat-history', body)
      .then((response) => {
        return response.data.responseMessage;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectSocket = () => {
    const sock = new SockJS(`http://35.216.19.135:8080/chat/${userId}`);
    setSockJs(sock);

    sock.onopen = async function () {
      console.log('sock 연결됐다.');
      var list = await getTodayChattingHistory();
      setChatData(list);
      sock.onmessage = function (message) {
        const data = JSON.parse(message.data);
        console.dir(data);
        list.push(data);
        setChatData(Object.assign([], list));
      };

      sock.onclose = function () {
        console.log('없애줘..');
      };
    };
    return sock;
  };

  /**
   * * sock연결 및 receive
   */

  useEffect(() => {
    if (!sockJs) {
      connectSocket();
    }
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
              chatData.map((item, index) =>
                item.sendTime ? (
                  <ChatLog
                    key={index}
                    userName={item.userName}
                    chatFromMe={item.userId}
                    chatMessage={item.message}
                    chatDate={item.sendTime}
                  />
                ) : (
                  <LoginMessage key={index} message={item.message} />
                ),
              )
            ) : (
              <div>아직 데이터가 없어유 수정해보아유</div>
            )}
          </div>
        </div>
        <InputBox
          sockJs={sockJs}
          connectSocket={connectSocket}
          setSockJs={setSockJs}
        />
      </div>
    </div>
  );
};

export default HomePage;
