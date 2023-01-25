import React, { useEffect, useState } from 'react';
import styles from '../style/css/loginPage.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ID_EMPTY, PW_EMPTY } from '../constants/message';
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

  const handleSubmit = (e) => {
    let body = {
      id: userId,
      password: userPw,
    };
    e.preventDefault();
    if (idValid && pwValid) {
      axios
        .post('/login', body, {
          withCredentials: true,
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((response) => {
          alert(response.data.responseMessage);

          localStorage.setItem('id', userId);
          navigate('/mainchat');
        })
        .catch((error) => {
          console.log(error);
          console.log('Error: ', error.message);
          alert(error.response.data.responseMessage);
        });
    }
  };

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
