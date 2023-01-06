import React from 'react';
import styles from '../../style/css/homePage.module.css';

const ChatLog = ({ chatFromMe, userName, chatMessage }) => {
  const chatDate = new Date();
  return (
    <div>
      <div
        className={
          chatFromMe == true
            ? styles.typed_chat_fromMe
            : styles.typed_chat_fromPeople
        }
      >
        <div className={styles.typed_chat_info}>
          <div className={styles.typed_chat_name}>{userName}</div>
          <div className={styles.typed_chat_time}>
            {chatDate.toLocaleString()}
          </div>
        </div>
        <div className={styles.typed_chat_message}>{chatMessage}</div>
      </div>
    </div>
  );
};
export default ChatLog;
