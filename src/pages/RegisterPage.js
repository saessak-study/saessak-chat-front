import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterInput from '../components/Common/RegisterInput';
import styles from '../style/css/registerPage.module.css';
import {
  EMAIL_INVALID,
  PW_INVALID,
  INFO_INVALID,
  PW_VALID_CHECK,
  ID_VALID_CHECK,
} from '../constants/message';
import { rEmail, rPassword, rId } from '../constants/regEx';

const RegisterPage = () => {
  const [idValid, setidValid] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwSame, SetPwSame] = useState(false);
  /**
   * &아이디가 validity를 통과하지 못한다면 alert를 뱉는 함수 */
  const checkingID = () => {
    let id_Valid = document.getElementById('id_Valid').value;
    if (rId.test(id_Valid)) {
      alert('사용가능한 아이디입니다');
      setidValid(true);
      document.getElementById('id_ValidMSG').innerHTML = '';
    } else {
      alert('사용할 수 없는 아이디입니다');
      setidValid(false);
      document.getElementById('id_ValidMSG').innerHTML = ID_VALID_CHECK;
    }
  };
  /**
   * &비밀번호의 validity 검사하는 함수 */
  const checkingPW = () => {
    let pw_origin = document.getElementById('pw_Valid').value;
    if (rPassword.test(pw_origin)) {
      setPwValid(true);
      document.getElementById('pw_ValidMSG').innerHTML = '';
    } else {
      setPwValid(false);
      document.getElementById('pw_ValidMSG').innerHTML = PW_VALID_CHECK;
    }
  };
  /**
   * &비밀번호와 비밀번호 확인 값이 같은지 확인하는 함수 */
  const checkingPW_invalid = () => {
    let pw_origin = document.getElementById('pw_Valid').value;
    let pw_same = document.getElementById('pw_invalid').value;
    if (pw_origin == pw_same) {
      document.getElementById('pw_invalidMSG').innerHTML = '';
      SetPwSame(true);
    } else {
      document.getElementById('pw_invalidMSG').innerHTML = PW_INVALID;
      SetPwSame(false);
    }
  };
  /**
   * &이름이 공란인지 확인해주는 함수 */
  const checkingName = () => {
    let name_valid = document.getElementById('name_valid').value;
    if (name_valid == '') {
      setNameEmpty(true);
      document.getElementById('name_validMSG').innerHTML = INFO_INVALID;
    } else {
      setNameEmpty(false);
      document.getElementById('name_validMSG').innerHTML = '';
    }
  };
  /**
   * &이메일 validity 검사하는 함수 */
  const checkingEmail = () => {
    let email_valid = document.getElementById('email_valid').value;
    if (rEmail.test(email_valid)) {
      setEmailValid(true);
      document.getElementById('email_validMSG').innerHTML = '';
    } else {
      setEmailValid(false);
      document.getElementById('email_validMSG').innerHTML = EMAIL_INVALID;
    }
  };
  /**
   * &마지막으로 점검하는 함수 */
  const finalChk = () => {
    if (idValid == false) {
      alert('아이디 중복확인을 클릭해주세요');
    } else if (pwValid == false) {
      alert('비밀번호를 입력해 주세요');
    } else if (pwSame == false) {
      alert('비밀번호가 일치하지 않습니다');
    } else if (nameEmpty == true) {
      alert('이름에 공란이 있습니다.');
    } else if (emailValid == false) {
      alert('이메일 형식이 올바르지 않습니다.');
    } else {
      alert('회원가입이 완료되었습니다!');
    }
  };
  return (
    <div className={styles.register_wholesome}>
      <div className={styles.register_background}>
        <div className={styles.register_title}>
          <h1>🌱SaessakChat🌱</h1>
        </div>
        <div className={styles.register_inputContainer}>
          <div className={styles.register_IDBox}>
            <input
              id={'id_Valid'}
              name="checkId"
              className={styles.register_inputID}
              placeholder={'아이디'}
            ></input>
            <button className={styles.register_idChk} onClick={checkingID}>
              중복검사
            </button>
          </div>
          <div className={styles.register_warningMSG} id={'id_ValidMSG'}>
            {ID_VALID_CHECK}
          </div>
          <RegisterInput
            inputid={'pw_Valid'}
            name={'pw_Valid'}
            messageID={'pw_ValidMSG'}
            message={PW_VALID_CHECK}
            inputType={'password'}
            placeholder={'비밀번호'}
            onChange={checkingPW}
          />
          <RegisterInput
            inputid={'pw_invalid'}
            name={'pw_invalid'}
            message={PW_INVALID}
            messageID={'pw_invalidMSG'}
            inputType={'password'}
            placeholder={'비밀번호 확인'}
            onChange={checkingPW_invalid}
          />
          <RegisterInput
            inputid={'name_valid'}
            name={'name_valid'}
            message={INFO_INVALID}
            messageID={'name_validMSG'}
            inputType={'text'}
            placeholder={'이름'}
            onChange={checkingName}
          />
          <RegisterInput
            inputid={'email_valid'}
            name={'email_valid'}
            message={EMAIL_INVALID}
            messageID={'email_validMSG'}
            inputType={'text'}
            placeholder={'이메일'}
            onChange={checkingEmail}
          />
          <div className={styles.register_btn} onClick={finalChk}>
            회원가입
          </div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={styles.login_routeBtn}>
              로그인 화면으로 돌아가기
            </div>
          </Link>
          <div className={styles.idchk_complete}>
            이 아이디는 사용가능한 아이디입니다.
            <div className={styles.idButtonBox}>
              <div className={styles.usingID}>아이디 사용</div>
              <div className={styles.cancelID}>취소</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
