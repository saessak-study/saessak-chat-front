import React from 'react';
import styles from '../style/css/homePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.left_container}>
        <div className={styles.main_logo}>🌱SaessakChat🌱</div>
        <div className={styles.user_container}>
          <div className={styles.user_online}>🙌현재 접속중인 유저</div>
          <div className={styles.user_status_container}>
            <div className={styles.user_status}>
              <div>유저1 🟢</div>
            </div>
            <div className={styles.user_status}>
              <div>유저2 ⚫</div>
            </div>
            <div className={styles.user_status}>
              <div>유저1 🟢</div>
            </div>
            <div className={styles.user_status}>
              <div>유저2 ⚫</div>
            </div>
            <div className={styles.user_status}>
              <div>유저1 🟢</div>
            </div>
            <div className={styles.user_status}>
              <div>유저2 ⚫</div>
            </div>
          </div>
        </div>
        <div className={styles.user_logout}>🚨로그아웃하기</div>
      </div>
      <div className={styles.chatlog_container}>
        <div className={styles.typed_chat_fromMe}>
          <div className={styles.typed_chat_info}>
            <div className={styles.typed_chat_name}>정길웅</div>
            <div className={styles.typed_chat_time}>2023.01.06 (금) 오전 8시 40분</div>
          </div>
          <div className={styles.typed_chat_message}>
            안녕하세요! 혹시 고쳐야 할 UI나 추가하면 좋을 것 같은 기능도 말씀해주세요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;