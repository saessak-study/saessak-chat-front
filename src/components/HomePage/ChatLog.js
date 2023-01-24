import React from 'react';
import styles from '../../style/css/homePage.module.css';

const ChatLog = ({ chatFromMe, userName, chatMessage, chatDate }) => {
  const userId = localStorage.getItem('id');
  const first = chatDate.split().join();
  const convert = new Date(first);
  const lastTime = new Date(convert).toTimeString().split(' ')[0];
  const lastDay = new Date(convert)
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  return (
    <div>
      <div
        className={
          chatFromMe === userId
            ? styles.typed_chat_fromMe
            : styles.typed_chat_fromPeople
        }
      >
        <div className={styles.typed_chat_info}>
          <div className={styles.typed_chat_name}>{userName}</div>
          <div className={styles.typed_chat_time}>
            {lastDay} {lastTime}
          </div>
        </div>
        <div className={styles.typed_chat_message}>{chatMessage}</div>
      </div>
    </div>
  );
};
export default ChatLog;
