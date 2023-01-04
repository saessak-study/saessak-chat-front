import React from 'react'
import styles from "../style/css/loginPage.module.css"

const LoginPage = () => {
  return (
    <div className={styles.app}>
      <div className={styles.app_name}>🌱SaessakChat🌱</div>
      <div className={styles.login_container}>
        <form noValidate="" className={styles.login_form}>
          <div className={styles.login_submit_container}>
            <div className={styles.login_input_container}>
              <div className={styles.input_id}>
                <label htmlFor="id" className={styles.input_id_label}>아이디</label>
                <input className={styles.login_input_box}></input>
              </div>
              <div className={styles.input_pw}>
                <label htmlFor="password" className={styles.input_pw_label}>비밀번호</label>
                <input className={styles.login_input_box}></input>
              </div>
            </div>

            <div className={styles.login_submit_btn_container}>
              <button className=''>로그인</button>
            </div>
          </div>
        </form>

        <div className={styles.finduserinfo_btn_container}>
          <div className={styles.horizontal_content_line_rule}>
              <hr className={styles.horizontal_content_leftLine}/>
              <div className={styles.horizontal_content}>
                <button className={styles.finduserinfo_btn}>아이디 or 비밀번호 찾기</button>
              </div>
              <hr className={styles.horizontal_content_rightLine}/>
          </div>
        </div>

        <div className={styles.register_btn_container}>
          <label htmlFor="goToRegister" className={styles.register_label}>SaessakChat의 회원이 아니신가요?</label>
          <button className={styles.register_btn}>회원가입하기</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage