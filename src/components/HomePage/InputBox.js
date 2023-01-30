import React, { useState, useCallback } from 'react';
import styles from '../../style/css/homePage.module.css';

const InputBox = ({ sockJs, connectSocket, setSockJs }) => {
  const [chatInput, setChatInput] = useState('');

  const onSubmitMessage = useCallback(() => {
    if (sockJs) {
      sockJs.send(chatInput);
      console.log(chatInput);
      console.log('보냄');
    } else {
      const newSocket = connectSocket();
      newSocket.send(newSocket);
      setSockJs(newSocket);
    }
    setChatInput('');
  }, [chatInput, sockJs, setSockJs, connectSocket]);

  const onChange = (e) => {
    setChatInput(e.target.value);
  };

  return (
    <div className={styles.chatInput_container}>
      <input
        className={styles.chatInput}
        onChange={onChange}
        value={chatInput}
        type="text"
      ></input>
      <div className={styles.chatInput_send} onClick={() => onSubmitMessage()}>
        📝
      </div>
    </div>
  );
};

export default InputBox;
