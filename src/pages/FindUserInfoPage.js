import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FindIdInput from '../components/FindUserInfo/FindIdInput';
import FindPwInput from '../components/FindUserInfo/FindPwInput';
import styles from '../style/css/findUserInfoPage.module.css';

const FindUserInfoPage = () => {
  const [inputs, setInput] = useState({
    checkId: '',
    checkName: '',
    checkEmail: '',
  });
  const { checkId, checkName, checkEmail } = inputs;
  const [idEmpty, setIdEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [idPwToggle, setIdPwToggle] = useState(true);
  const [modal, setModal] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
  };

  /** 화면 전환 및 전환 시 기존데이터 초기화 */
  const IdAndPwToggleHandler = () => {
    setIdPwToggle(!idPwToggle);
    setEmailValid(false);
    setNameEmpty(false);
    setEmailEmpty(false);
  };

  const onFindIdHandler = (e) => {
    const exp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    e.preventDefault();
    if (!checkName && !checkEmail) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      return;
    }

    if (!checkEmail) {
      setEmailEmpty(true);
      setNameEmpty(false);
      setEmailValid(false);
      return;
    }

    if (!checkName) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      return;
    }

    if (checkName && checkEmail) {
      if (exp.test(checkEmail)) {
        setModal(true);
        setEmailEmpty(false);
        setNameEmpty(false);
        setEmailValid(false);
      } else {
        setEmailValid(true);
        setEmailEmpty(false);
        setNameEmpty(false);
      }
    }
  };

  const onFindPwHandler = (e) => {
    const exp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    e.preventDefault();
    if (!checkName && !checkEmail && !checkId) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
      return;
    }

    if (!checkEmail) {
      setEmailEmpty(true);
      setNameEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
      return;
    }

    if (!checkName) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
      return;
    }

    if (!checkId) {
      setIdEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      setNameEmpty(false);
      return;
    }

    if (checkName && checkEmail && checkId) {
      if (exp.test(checkEmail)) {
        setModal(true);
        setEmailEmpty(false);
        setNameEmpty(false);
        setEmailValid(false);
        setIdEmpty(false);
      } else {
        setEmailValid(true);
        setEmailEmpty(false);
        setNameEmpty(false);
        setIdEmpty(false);
      }
    }
  };

  const modalHandler = () => {
    setModal(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>
      <div className={styles.findInfo_box}>
        <div
          className={`${
            idPwToggle ? styles.findId : styles.findIdAndPw_toggle
          }`}
        >
          <span onClick={idPwToggle ? null : IdAndPwToggleHandler}>
            아이디 찾기
          </span>
        </div>
        <div
          className={`${
            idPwToggle ? styles.findIdAndPw_toggle : styles.findPw
          }`}
        >
          <span onClick={idPwToggle ? IdAndPwToggleHandler : null}>
            비밀번호 찾기
          </span>
        </div>
      </div>
      <div className={styles.findIdAndPw_container}>
        {idPwToggle ? (
          <FindIdInput
            modal={modal}
            onFindIdHandler={onFindIdHandler}
            onChange={onChange}
            modalHandler={modalHandler}
            nameEmpty={nameEmpty}
            emailEmpty={emailEmpty}
            emailValid={emailValid}
          />
        ) : (
          <FindPwInput
            modal={modal}
            onFindPwHandler={onFindPwHandler}
            onChange={onChange}
            modalHandler={modalHandler}
            nameEmpty={nameEmpty}
            emailEmpty={emailEmpty}
            emailValid={emailValid}
            idEmpty={idEmpty}
          />
        )}
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className={styles.navigate_text}>로그인 페이지로 돌아가기</div>
      </Link>
    </div>
  );
};

export default FindUserInfoPage;
