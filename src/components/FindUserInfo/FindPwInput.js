import React from 'react';
import Modal from './Modal';
import styles from '../FindUserInfo/css/FindIdPwInput.module.css';

const FindPwInput = ({
  modal,
  modalHandler,
  onFindPwHandler,
  onChange,
  nameEmpty,
  emailEmpty,
  emailValid,
  idEmpty,
  checkName,
  checkEmail,
  checkId,
  modalMessage,
  modalFor,
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
              아이디
              <input onChange={onChange} name="checkId" value={checkId} />
            </label>
            <label>
              이메일
              <input onChange={onChange} name="checkEmail" value={checkEmail} />
            </label>
          </div>
          <div className={styles.check_btn_container}>
            <button onClick={onFindPwHandler}>확인</button>
          </div>
        </div>
        <Modal
          modalHandler={modalHandler}
          modal={modal}
          modalMessage={modalMessage}
          modalFor={modalFor}
        />
      </div>
      <div className={styles.check_valid_box}>
        <span className={styles.check_valid_message}>
          {nameEmpty && '※ 이름을 입력해주세요 ※'}
          {emailEmpty && '※ 이메일을 입력해주세요 ※ '}
          {emailValid && '※ 이메일 형식이 맞지 않습니다 ※'}
          {idEmpty && '※ 아이디를 입력해주세요 ※ '}
        </span>
      </div>
    </>
  );
};

export default FindPwInput;
