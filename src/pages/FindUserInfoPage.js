import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FindIdInput from '../components/FindUserInfo/FindIdInput';
import styles from '../style/css/findUserInfoPage.module.css';

const FindUserInfoPage = () => {
  const [toggle, setToggle] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const modalHandler = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>
      <div className={styles.findInfo_box} onClick={toggleHandler}>
        <div
          className={`${toggle ? styles.findId : styles.findIdAndPw_toggle}`}
        >
          <span>아이디 찾기</span>
        </div>
        <div
          className={`${toggle ? styles.findIdAndPw_toggle : styles.findPw}`}
        >
          <span>비밀번호 찾기</span>
        </div>
      </div>
      <div className={styles.findIdAndPw_container}>
        {toggle ? (
          <FindIdInput
            topLabel="이름"
            bottomLable="이메일"
            modal={modal}
            setModal={setModal}
            modalHandler={modalHandler}
          />
        ) : (
          <FindIdInput
            topLabel="아이디"
            bottomLable="이메일"
            modal={modal}
            setModal={setModal}
            modalHandler={modalHandler}
          />
        )}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={styles.navigate_text}>로그인 페이지로 돌아가기</div>
        </Link>
      </div>
    </div>
  );
};

export default FindUserInfoPage;
