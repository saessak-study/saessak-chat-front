import React from 'react';
import styles from './css/Modal.module.css';

const Modal = ({ modal, modalHandler, modalFor, modalMessage }) => {
  return (
    <div className={`${modal ? styles.modal : styles.hidden}`}>
      <div className={styles.modal_overlay}></div>

      <div className={styles.modal_content}>
        {modalFor === 'id' && '[아이디]'}
        {modalFor === 'password' && '[비밀번호는]'}
        <br /> {modalMessage}
      </div>

      <div className={styles.modal_close_button}>
        <button onClick={modalHandler}>확인 후 닫기</button>
      </div>
    </div>
  );
};

export default Modal;
