import React from 'react';
import ChatLog from '../components/HomePage/ChatLog';
import ChkUserOnline from '../components/HomePage/ChkUserOnline';
import styles from '../style/css/homePage.module.css';

const HomePage = () => {
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
          <ChatLog
            chatFromMe={true}
            userName={'정길웅'}
            chatMessage={'안녕하세요?'}
          />
          <ChatLog
            chatFromMe={false}
            userName={'신하영'}
            chatMessage={'안녕하세요?'}
          />
          <ChatLog
            chatFromMe={false}
            userName={'심성보'}
            chatMessage={'안녕하세요?'}
          />
        </div>
        <div className={styles.chatInput_container}>
          <input className={styles.chatInput}></input>
          <div className={styles.chatInput_send}>전송</div>
        </div>
      </div>
    </div>
  );
};

/**
 * TODO 채팅을 쳐서 채팅로그로 보내는 함수 만들기
 * @param {e} e
 */
const inputToChatlog = (e) => {
  console.log(e.target.value);
};

export default HomePage;
