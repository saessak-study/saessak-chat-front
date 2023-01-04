import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../style/css/loginPage.module.css"

/** 상수값 따로 빼는 디렉토리 or 파일 생성 필요 */
const ID_EMPTY = "※ 아이디를 입력해주세요 ※";
const PW_EMPTY = "※ 비밀번호를 입력해주세요 ※";

/** 백엔드와 api 통신으로 user 정보 받아와야 수행 가능한 경고문 2개 */
const PW_WRONG = "※ 비밀번호를 다시 확인해주세요 ※";
const NO_USER = "※ 아이디, 비밀번호를 잘못 입력하였습니다 ※";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setpwValid] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate(); 

 const loginBtnAction = (e) => {
  e.preventDefault();
  if((!id && !pw) || !id){
    setIsAlert(true);
    setIdValid(false);
    setpwValid(false);
  }
  else if(!pw){
    setIsAlert(true);
    setIdValid(true);
    setpwValid(false);
  }
  else{
    setIsAlert(false);
    setIdValid(true);
    setpwValid(true);
    goToHome();
  }
 }

  const goToRegister = () => {
    navigate(`/RegisterPage`);
  };

  const goToHome = () => {
    navigate(`/HomePage`);
  };

  const goToFindUserInfo = () => {
    navigate(`/FindUserInfoPage`)
  };
  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>

      <div className={styles.login_container}>
        <form noValidate="" className={styles.login_form}>
          <div className={styles.login_submit_container}>
            
            <div className={styles.login_input_container}>
              <div className={styles.input_id}>
                <label htmlFor="id" className={styles.input_label}>아이디</label>
                <input className={styles.login_input_box} maxLength={12} value={id} onChange={(e) => setId(e.target.value)}/>
              </div>

              <div className={styles.input_pw}>
                <label htmlFor="password" className={styles.input_label}>비밀번호</label>
                <input type="password" className={styles.login_input_box} value={pw} maxLength={16} onChange={(e) => setPw(e.target.value)}/>
              </div>
            </div>

            <div className={styles.login_submit_btn_container}>
              <button className={styles.login_submit_btn} style={{cursor:'pointer'}} onClick={loginBtnAction}>로그인</button>
            </div>
          </div>
        </form>

        <div className={styles.login_valid_alert_box}>
          <span
              className={styles.login_valid_alert_message}>
          {isAlert && !idValid && !pwValid && ID_EMPTY}
          {isAlert && idValid && !pwValid && PW_EMPTY}
          {!isAlert && idValid && pwValid? "" : null }
          </span>
        </div>

        <div className={styles.finduserinfo_btn_container}>
          <hr className={styles.horizontal_content_leftLine}/>
          <div className={styles.horizontal_content}>
              <button className={styles.finduserinfo_btn} style={{cursor:'pointer'}} onClick={goToFindUserInfo}>아이디 or 비밀번호 찾기</button>
          </div>
          <hr className={styles.horizontal_content_rightLine}/>
        </div>

        <div className={styles.register_btn_container}>
          <label htmlFor="goToRegister" className={styles.register_label}>SaessakChat의 회원이 아니신가요?</label>
          <button className={styles.register_btn} style={{cursor:'pointer'}} onClick={goToRegister}>회원가입하기</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage