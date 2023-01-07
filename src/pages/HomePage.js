import React, { useState } from 'react';
import ChatLog from '../components/HomePage/ChatLog';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';
import chatlog from '../constants/chatlog.json';

const HomePage = () => {
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
        <div className={styles.user_logout}>🚪로그아웃하기</div>
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
