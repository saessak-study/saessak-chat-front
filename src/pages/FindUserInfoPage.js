import React, { useState } from 'react';
import CommonInput from '../components/Common/CommonInput';
import { useNavigate } from 'react-router-dom';
import styles from '../style/css/findUserInfoPage.module.css';

const FindUserInfoPage = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const goToLoginPage = () => {
    navigate(`/LoginPage`);
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
          <CommonInput topLabel="이름" bottomLable="이메일" />
        ) : (
          <CommonInput topLabel="아이디" bottomLable="이메일" />
        )}
        <div className={styles.navigate_text} onClick={goToLoginPage}>로그인 페이지로 돌아가기</div>
      </div>
    </div>
  );
};

export default FindUserInfoPage;
