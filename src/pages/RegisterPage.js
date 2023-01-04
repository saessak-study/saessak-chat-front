import React from 'react';
import { Link } from 'react-router-dom';
import RegisterInput from '../components/Common/RegisterInput';
import styles from '../style/css/registerPage.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.register_background}>
      <div className={styles.register_title}>
        <h1>🌱SaessakChat🌱</h1>
      </div>
      <div className={styles.register_inputContainer}>
        <div className={styles.register_IDBox}>
          <input className={styles.register_inputID}></input>
          <button className={styles.register_idChk}>중복검사</button>
        </div>
        <div className={styles.register_warningMSG}>
          4~12자의 영문 대소문자와 숫자로만 입력해주세요.
        </div>
        <RegisterInput message={"8~16자의 소문자,숫자,특수문자를 사용하세요." } />
        <RegisterInput message={"비밀번호가 일치하지 않습니다." } />
        <RegisterInput message={"올바른 정보를 입력해주세요." } />
        <RegisterInput message={"이메일 형식이 맞지 않습니다." } />
        <div className={styles.register_btn}>
          회원가입
        </div>
        <Link to='/' style={{ textDecoration: 'none' }}>
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
  )
}

export default RegisterPage;