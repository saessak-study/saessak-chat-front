import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FindIdInput from '../components/FindUserInfo/FindIdInput';
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
      {/*이 부분 수정 필요 각 요소마다 이벤트 따로 넣어야 할듯*/}
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
        {/** 이 부분은 밑에를 FindPw컴포넌트 넣으면 될듯 */}
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
