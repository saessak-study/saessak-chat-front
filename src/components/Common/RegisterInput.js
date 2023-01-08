import React from 'react';
import styles from '../../style/css/registerPage.module.css';

const RegisterInput = ({
  inputid,
  message,
  inputType,
  placeholder,
  onChange,
  name,
  messageID,
}) => {
  return (
    <div>
      <div className={styles.register_IDBox}>
        <input
          id={inputid}
          className={styles.register_inputForm}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
        ></input>
      </div>
      <div className={styles.register_warningMSG} id={messageID}>
        {message}
      </div>
    </div>
  );
};

export default RegisterInput;
