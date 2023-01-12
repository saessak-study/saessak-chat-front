// RegisterInput.js
import React from 'react';
import styles from '../../style/css/registerPage.module.css';

const RegisterInput = ({
  name,
  message,
  inputType,
  placeholder,
  onChange,
  value,
  showUpMSG,
}) => {
  return (
    <div>
      <div className={styles.register_IDBox}>
        <input
          className={styles.register_inputForm}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        ></input>
      </div>
      <div className={styles.register_warningMSG}>
        {showUpMSG ? message : null}
      </div>
    </div>
  );
};

export default RegisterInput;
