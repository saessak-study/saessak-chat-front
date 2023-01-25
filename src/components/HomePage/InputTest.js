import React, { useState, useCallback } from 'react';
import styles from '../../style/css/homePage.module.css';
import axios from 'axios';

const InputBox = ({ sockJs, setChatData }) => {
  const [chatInput, setChatInput] = useState('');

  const onSubmitMessage = useCallback(() => {
    sockJs.send(chatInput);
    sockJs.onmessage = function (e) {
      axios.get('/chat-history').then((response) => {
        setChatData(response.data.responseMessage);
      });
    };
    setChatInput('');
  }, [chatInput, sockJs, setChatData]);

  const onChange = useCallback((e) => {
    setChatInput(e.target.value);
  }, []);

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
