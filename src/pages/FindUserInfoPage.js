import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FindIdInput from '../components/FindUserInfo/FindIdInput';
import FindPwInput from '../components/FindUserInfo/FindPwInput';
import styles from '../style/css/findUserInfoPage.module.css';

const FindUserInfoPage = () => {
  const [toggle, setToggle] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleHandler = (e) => {
    setToggle(!toggle);
  };

  const modalHandler = (e) => {
    setModal(!modal);
  };

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>
      <div className={styles.findInfo_box}>
        <div
          className={`${toggle ? styles.findId : styles.findIdAndPw_toggle}`}
        >
          <span onClick={toggle ? null : toggleHandler}>아이디 찾기</span>
        </div>
        <div
          className={`${toggle ? styles.findIdAndPw_toggle : styles.findPw}`}
        >
          <span onClick={toggle ? toggleHandler : null}>비밀번호 찾기</span>
        </div>
      </div>
      <div className={styles.findIdAndPw_container}>
        {toggle ? (
          <FindIdInput modal={modal} modalHandler={modalHandler} />
        ) : (
          <FindPwInput modal={modal} modalHandler={modalHandler} />
        )}
      </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className={styles.navigate_text}>로그인 페이지로 돌아가기</div>
      </Link>
    </div>
  );
};

export default FindUserInfoPage;
