import React from 'react';
import styles from '../../style/css/registerPage.module.css';

const RegisterInput = ({ message, inputType, placeholder }) => {
  return (
    <div>
      <div className={styles.register_IDBox}>
        <input
          className={styles.register_inputForm}
          type={inputType}
          placeholder={placeholder}
        ></input>
      </div>
      <div className={styles.register_warningMSG}>{message}</div>
    </div>
  );
};

export default RegisterInput;
