import React from 'react';
import styles from '../../style/css/registerPage.module.css';

const RegisterInput = ({
  inputID,
  message,
  inputType,
  placeholder,
  onChange,
  name,
}) => {
  return (
    <div>
      <div className={styles.register_IDBox}>
        <input
          id={inputID}
          className={styles.register_inputForm}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
        ></input>
      </div>
      <div className={styles.register_warningMSG}>{message}</div>
    </div>
  );
};

export default RegisterInput;
