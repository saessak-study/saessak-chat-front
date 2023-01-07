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
  const [inputs, setInput] = useState({
    checkId: '',
    checkPassword: '',
    checkName: '',
    checkEmail: '',
  });
  const { checkId, checkPassword, checkName, checkEmail } = inputs;
  const [idValid, setidValid] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwEmpty, setPwEmpty] = useState(false);

  /**
   * ^인풋값이 바뀔 때마다 state값 변화시켜주는 함수 */
  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
  };
  /**
   * ^아이디가 validity를 통과하지 못한다면 alert를 뱉는 함수 */
  const checkingID = () => {
    if (rId.test(inputs.checkId)) {
      alert('사용가능한 아이디입니다');
      setidValid(true);
    } else {
      alert('사용할 수 없는 아이디입니다');
      setidValid(false);
    }
  };
  /**
   * ^비밀번호의 validity 검사하는 함수 */
  const checkingPW = () => {
    if (rPassword.test(inputs.checkPassword)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  /**
   * ^비밀번호와 비밀번호 확인 값이 같은지 확인하는 함수 */
  const checkingPW_invalid = () => {
    let pw_origin = document.getElementById('pw_Valid').value;
    let pw_same = document.getElementById('pw_invalid').value;
    pw_origin == pw_same ? setPwValid(true) : setPwValid(false);
  };
  /**
   * ^이메일 validity 검사하는 함수 */
  const checkingEmail = () => {
    if (rEmail.test(inputs.checkEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  /**
   * ^ghldnjsrkdlq
   */
  const finalChk = () => {
    if (pwValid == false) {
      return;
    } else {
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
              name="checkId"
              className={styles.register_inputID}
              placeholder={'아이디'}
              onChange={onChange}
            ></input>
            <button className={styles.register_idChk}>중복검사</button>
          </div>
          <div className={styles.register_warningMSG}>{ID_VALID_CHECK}</div>
          <RegisterInput
            inputID={'pw_Valid'}
            name={'pw_Valid'}
            message={PW_VALID_CHECK}
            inputType={'password'}
            placeholder={'비밀번호'}
          />
          <RegisterInput
            inputID={'pw_invalid'}
            name={'pw_invalid'}
            message={PW_INVALID}
            inputType={'password'}
            placeholder={'비밀번호 확인'}
          />
          <RegisterInput
            inputID={'name_valid'}
            name={'name_valid'}
            message={INFO_INVALID}
            inputType={'text'}
            placeholder={'이름'}
            onChange={onChange}
          />
          <RegisterInput
            inputID={'email_valid'}
            name={'email_valid'}
            message={EMAIL_INVALID}
            inputType={'text'}
            placeholder={'이메일'}
            onChange={onChange}
          />
          <div className={styles.register_btn}>회원가입</div>
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
