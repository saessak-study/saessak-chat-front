import React from 'react';
import styles from './css/Modal.module.css';

/**
 * * ID, PW 찾을 때 사용되는 모달
 * TODO: 하드 코딩된 부분 ID,PW 에 따라 text변경 보완 필요
 */
const Modal = ({ modal, modalHandler }) => {
  return (
    <div className={`${modal ? styles.modal : styles.hidden}`}>
      <div className={styles.modal_overlay}></div>
      <div className={styles.modal_content}>
        아이디는
        <br /> 123456입니다
      </div>
      <div className={styles.modal_close_button}>
        <button onClick={modalHandler}>확인 후 닫기</button>
      </div>
    </div>
  );
};

export default Modal;
