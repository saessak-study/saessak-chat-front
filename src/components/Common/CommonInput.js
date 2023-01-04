import React, { useState } from 'react';
import styles from '../Common/css/CommonInput.module.css';
import Modal from './Modal';

/**
 * * 로그인 및 ID,PW 찾기에서 재사용 가능
 * * label태그 안 children만 props로 받아오면 됨
 * TODO: Modal 수정 및 보완 필요(데이터 바인딩)
 */
const CommonInput = ({ topLabel, bottomLable }) => {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <div className={styles.input_container}>
      <div className={styles.input_form_box}>
        <div className={styles.input_info}>
          <label>
            {topLabel}
            <input />
          </label>
          <label>
            {bottomLable}
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

export default CommonInput;
