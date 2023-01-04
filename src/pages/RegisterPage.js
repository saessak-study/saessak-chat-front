import React from 'react';
import Register_input from '../Components/registerPage/Register_input';
import '../style/css/registerPage.css';

const RegisterPage = () => {
  return (
    <div className='register_background'>
      <div className='register_title'>
        <h1>🌱SaessakChat🌱</h1>
      </div>
      <div className='register_inputContainer'>
        <div className='register_IDBox'>
          <input className='register_inputID'></input>
          <button className='register_idChk'>중복검사</button>
        </div>
        <div className='register_warningMSG'>
          4~12자의 영문 대소문자와 숫자로만 입력해주세요.
        </div>
        <Register_input message={"8~16자의 소문자,숫자,특수문자를 사용하세요." } />
        <Register_input message={"비밀번호가 일치하지 않습니다." } />
        <Register_input message={"올바른 정보를 입력해주세요." } />
        <Register_input message={"이메일 형식이 맞지 않습니다." } />
        <div className='register_btn'>
          회원가입
        </div>
        <div className='login_routeBtn'>
          로그인 화면으로 돌아가기
        </div>
        <div className='idchk_complete'>
          이 아이디는 사용가능한 아이디입니다.
            <div className='idButtonBox'>
              <div className='usingID'>아이디 사용</div>
              <div className='cancelID'>취소</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;