import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import styles from '../style/css/loginPage.module.css';
import { ID_EMPTY, PW_EMPTY, PW_WRONG, NO_USER } from '../constants/message';
import axios from 'axios';
import useSWR from 'swr';

export const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((response) => response.data);

const LoginPage = () => {
  const { data, error, revalidate } = useSWR('http://', fetcher);
  // 데이터가 존재하지 않으면 로딩중이라는 것

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

  /** login버튼 누를 시 유효성 검사 */
  const loginBtnAction = (e) => {
    e.preventDefault();
    if ((!userId && !userPw) || !userId) {
      setIsAlert(true);
      setIdValid(false);
      setpwValid(false);
    } else if (!userPw) {
      setIsAlert(true);
      setIdValid(true);
      setpwValid(false);
    } else {
      setIsAlert(false);
      setIdValid(true);
      setpwValid(true);
      goToHome();
    }
  };

  /** API -> form태그 onsubmit에 적용 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (idValid && pwValid) {
      // api요청시 관리되는 state값들이 있으면
      // 요청 보내기 전에 state값들을 초기화
      setIsAlert(false);
      axios
        .post(
          'http://35.216.19.135:8080/signIn',
          {
            id: userId,
            pw: userPw,
          },
          {
            withCredentials: true,
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then((response) => {
          revalidate();
          // 성공 시 response로 mainchat으로 넘겨짐(정보들과 함께)
          navigate('/mainchat', {
            state: {
              before: '/',
              id: userId,
              pw: userPw,
            },
          });
        })
        .catch((error) => {
          // 에러 핸들링
          if (error.response) {
            setIsAlert(true);
            console.log(error.response.data);
          } else if (error.request) {
            // 요청이 이루어졌으나, 노응답
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제 발생
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  };

  const goToHome = () => {
    navigate(`/mainchat`);
  };

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>

      <div className={styles.login_container}>
        <form
          noValidate=""
          className={styles.login_form}
          onSubmit={handleSubmit}
        >
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
