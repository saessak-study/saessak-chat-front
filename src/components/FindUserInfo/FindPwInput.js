import React from 'react';
import Modal from './Modal';
import styles from '../FindUserInfo/css/FindIdPwInput.module.css';

const FindPwInput = ({ modal, modalHandler }) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.input_form_box}>
        <div className={styles.input_info}>
          <label>
            이름
            <input />
          </label>
          <label>
            아이디
            <input />
          </label>
          <label>
            이메일
            <input />
          </label>
        </div>
        <div className={styles.check_btn_container}>
          <button onClick={modalHandler}>확인</button>
        </div>
      </div>
      <Modal modalHandler={modalHandler} modal={modal} />
    </div>
  );
};

export default FindPwInput;
