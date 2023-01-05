import React, { useState } from 'react';
import styles from '../FindUserInfo/css/FindIdPwInput.module.css';
import Modal from './Modal';

/**
 * TODO: Modal 수정 및 보완 필요(데이터 바인딩)
 */
const FindIdInput = ({ modal, modalHandler }) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.input_form_box}>
        <div className={styles.input_info}>
          <label>
            이름
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

export default FindIdInput;
