import React, { useState } from 'react';
import styles from '../FindUserInfo/css/FindIdPwInput.module.css';
import Modal from './Modal';

/**
 * TODO: Modal 수정 및 보완 필요(데이터 바인딩)
 */
const FindIdInput = ({
  modal,
  onFindIdHandler,
  modalHandler,
  onChange,
  nameEmpty,
  emailEmpty,
  emailValid,
  checkName,
  checkEmail,
}) => {
  return (
    <>
      <div className={styles.input_container}>
        <div className={styles.input_form_box}>
          <div className={styles.input_info}>
            <label>
              이름
              <input onChange={onChange} name="checkName" value={checkName} />
            </label>
            <label>
              이메일
              <input onChange={onChange} name="checkEmail" value={checkEmail} />
            </label>
          </div>
          <div className={styles.check_btn_container}>
            <button onClick={onFindIdHandler}>확인</button>
          </div>
        </div>
        <Modal modalHandler={modalHandler} modal={modal} />
      </div>
      <div className={styles.check_valid_box}>
        <span className={styles.check_valid_message}>
          {nameEmpty && '※ 이름을 입력해주세요 ※'}
          {emailEmpty && '※ 이메일을 입력해주세요 ※ '}
          {emailValid && '※ 이메일 형식이 맞지 않습니다 ※'}
        </span>
      </div>
    </>
  );
};

export default FindIdInput;
