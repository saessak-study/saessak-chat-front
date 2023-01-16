import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/css/loginPage.module.css';
import { ID_EMPTY, PW_EMPTY } from '../constants/message';
import axios from 'axios';
import { regPassword, regId } from '../constants/regEx';

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    userId: '',
    userPw: '',
  });
  const { userId, userPw } = inputs;
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setpwValid] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate();

  /** input 관리 */
  const onChangeInputs = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    if (regId.test(userId) && userId) setIdValid(true);
    if (regPassword.test(userPw) && userPw) setpwValid(true);
    if (!regId.test(userId) || !userId) setIdValid(false);
    if (!regPassword.test(userPw) || !userPw) setpwValid(false);
  }, [userId, userPw]);

  /** login버튼 누를 시 유효성 검사 */
  const loginBtnAction = (e) => {
    e.preventDefault();
    if (!idValid) {
      setIsAlert(true);
    } else if (!pwValid) {
      setIsAlert(true);
    } else {
      setIsAlert(false);
      handleSubmit(e);
    }
  };

  /** localStorage 확인용 코드 -> 지울것  */
  const gotohome = () => {
    navigate('/mainchat', {
      state: {
        before: '/',
        id: userId,
      },
    });
    localStorage.setItem('id', userId);
  };

  /** API -> form태그 onsubmit에 적용
   * package.json파일에 proxy로 로컬 서버 입력해놓았기에 나머지 부분만 작성한 것
   * 서버 url : http://35.216.19.135:8080/login
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      id: userId,
      password: userPw,
    };
    if (idValid && pwValid) {
      await axios
        .get('/login', {
          params: {
            id: userId,
            password: userPw,
          },
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((response) => {
          alert(response.message);
          /** 브라우저에 id 저장 */
          localStorage.clear();
          localStorage.setItem('id', userId);
          navigate('/mainchat');
        })
        .catch((error) => {
          // 에러 핸들링
          console.log(error.response);
          console.log('Error: ', error.message);
          alert(error.message);
        });
    }
  };
  /** user로그인 상태에 따른 분기처리 */
  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (userInfo) {
      navigate('/mainchat');
    }
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>

      <div className={styles.login_container}>
        <form noValidate="" className={styles.login_form}>
          <div className={styles.login_submit_container}>
            <div className={styles.login_input_container}>
              <div className={styles.input_id}>
                <label htmlFor="id" className={styles.input_label}>
                  아이디
                </label>
                <input
                  name="userId"
                  className={styles.login_input_box}
                  maxLength={12}
                  value={userId}
                  onChange={onChangeInputs}
                />
              </div>

              <div className={styles.input_pw}>
                <label htmlFor="password" className={styles.input_label}>
                  비밀번호
                </label>
                <input
                  name="userPw"
                  type="password"
                  className={styles.login_input_box}
                  value={userPw}
                  maxLength={16}
                  onChange={onChangeInputs}
                />
              </div>
            </div>

            <div className={styles.login_submit_btn_container}>
              <button
                className={styles.login_submit_btn}
                style={{ cursor: 'pointer' }}
                onClick={loginBtnAction}
              >
                로그인
              </button>
            </div>
          </div>
        </form>

        <div className={styles.login_valid_alert_box}>
          <span className={styles.login_valid_alert_message}>
            {isAlert && !idValid && !pwValid && ID_EMPTY}
            {isAlert && idValid && !pwValid && PW_EMPTY}
            {!isAlert && idValid && pwValid ? '' : null}
          </span>
        </div>

        <div className={styles.finduserinfo_btn_container}>
          <hr className={styles.horizontal_content_leftLine} />
          <div className={styles.horizontal_content}>
            <Link to="/infoinquiry">
              <button
                className={styles.finduserinfo_btn}
                style={{ cursor: 'pointer' }}
              >
                아이디 or 비밀번호 찾기
              </button>
            </Link>
          </div>
          <hr className={styles.horizontal_content_rightLine} />
        </div>

        <div className={styles.register_btn_container}>
          <label htmlFor="goToRegister" className={styles.register_label}>
            SaessakChat의 회원이 아니신가요?
          </label>
          <Link to="/registration">
            <button
              className={styles.register_btn}
              style={{ cursor: 'pointer' }}
            >
              회원가입하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
