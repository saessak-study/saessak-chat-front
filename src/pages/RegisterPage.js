import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/Common/RegisterInput';
import styles from '../style/css/registerPage.module.css';
import axios from 'axios';
// import fetcher from '../utils/fetcher';
import {
  EMAIL_INVALID,
  PW_INVALID,
  INFO_INVALID,
  PW_VALID_CHECK,
  ID_VALID_CHECK,
} from '../constants/message';
import { regEmail, regPassword, regId, regName } from '../constants/regEx';
// import useSWR from 'swr';

const RegisterPage = () => {
  // const {
  //   data: userData,
  //   error,
  //   mutate,
  // } = useSWR('http://35.216.19.135:8080/online-user', fetcher);

  const [inputs, setInputs] = useState({
    userId: '',
    userPw: '',
    userPwChk: '',
    userEmail: '',
    userName: '',
  });

  const { userId, userPw, userPwChk, userEmail, userName } = inputs;
  const navigate = useNavigate();

  /**
   * *메세지상태를 저장한 state
   *  */
  const [idMSG, setIdMSG] = useState(true);
  const [pwMSG, setPwMSG] = useState(true);
  const [pwValidMSG, setPwValidMSG] = useState(true);
  const [nameMSG, setNameMSG] = useState(true);
  const [emailMSG, setEmailMSG] = useState(true);

  const onChangeInputs = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /**
   * &아이디 중복검사 체크하는 함수
   * TODO 중복검사 클릭 시 API 요청확인
   * */
  const onCheckId = () => {
    if (userId) {
      if (regId.test(userId)) {
        setIdMSG(false);
        onCheckIdContinue();
      } else {
        alert('아이디 정보를 확인하세요');
      }
    }
  };

  // 아이디 중복 체크 api OK
  const onCheckIdContinue = async () => {
    await axios
      .post('/id-duplicate-check', { id: userId })
      .then((response) => {
        console.log(response);
        alert('사용 가능한 아이디입니다.');
        setIdMSG(false);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error: ', error.response.data.responseMessage);
        alert(error.response.data.responseMessage);
        setIdMSG(true);
      });
  };

  /**
   * &마지막으로 점검하는 함수
   * TODO 마지막 '회원가입이 완료되었습니다' 부분 API확인!!!
   * */
  const onLastCheck = () => {
    if (idMSG === true) {
      alert('아이디 중복확인을 클릭해주세요');
    } else if (pwMSG === true) {
      alert('비밀번호를 입력해 주세요');
    } else if (pwValidMSG === true) {
      alert('비밀번호가 일치하지 않습니다');
    } else if (nameMSG === true) {
      alert('이름에 공란이 있습니다.');
    } else if (emailMSG === true) {
      alert('이메일 형식이 올바르지 않습니다.');
    } else {
      onRegisterHandler();
    }
  };

  /** package.json파일에 proxy로 로컬 서버 입력해놓았기에 나머지 부분만 작성한 것
   *  서버 url : http://35.216.19.135:8080/sign-up
   */
  const onRegisterHandler = async () => {
    let body = {
      id: userId,
      mail: userEmail,
      name: userName,
      pw: userPw,
    };
    await axios
      .put('/sign-up', body)
      .then((response) => {
        console.log(response);
        alert('회원 가입이 완료되었습니다!');
        // mutate();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        console.log('Error: ', error.response.data.responseMessage);
        alert(error.response.data.responseMessage);
      });
  };

  /**
   * & input의 유효성검사에 따른 메세지 상태변경
   */
  useEffect(() => {
    if (userPw && regPassword.test(userPw)) {
      setPwMSG(false);
    }
    if (userPw && userPwChk && userPw === userPwChk) {
      setPwValidMSG(false);
    }
    if (userName && regName.test(userName)) {
      setNameMSG(false);
    }
    if (userEmail && regEmail.test(userEmail)) {
      setEmailMSG(false);
    }
  }, [userPw, userPwChk, userName, userEmail]);

  /** user로그인 상태에 따른 분기처리 */
  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (userInfo) {
      navigate('/mainchat');
    }
  }, []);

  return (
    <div className={styles.register_wholesome}>
      <div className={styles.register_background}>
        <div className={styles.register_title}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <h1>🌱SaessakChat🌱</h1>
          </Link>
        </div>
        <div className={styles.register_inputContainer}>
          <div className={styles.register_IDBox}>
            <input
              name={'userId'}
              className={styles.register_inputID}
              placeholder={'아이디'}
              onChange={onChangeInputs}
              value={userId}
            />
            <button
              className={styles.register_idChk}
              onClick={() => onCheckId()}
            >
              중복검사
            </button>
          </div>
          <div className={styles.register_warningMSG} id={'id_ValidMSG'}>
            {idMSG && ID_VALID_CHECK}
          </div>
          <RegisterInput
            name={'userPw'}
            message={PW_VALID_CHECK}
            inputType={'password'}
            placeholder={'비밀번호'}
            onChange={onChangeInputs}
            value={userPw}
            showUpMSG={pwMSG}
          />
          <RegisterInput
            name={'userPwChk'}
            message={PW_INVALID}
            inputType={'password'}
            placeholder={'비밀번호 확인'}
            onChange={onChangeInputs}
            value={userPwChk}
            showUpMSG={pwValidMSG}
          />
          <RegisterInput
            name={'userName'}
            message={INFO_INVALID}
            inputType={'text'}
            onChange={onChangeInputs}
            placeholder={'이름'}
            value={userName}
            showUpMSG={nameMSG}
          />
          <RegisterInput
            name={'userEmail'}
            message={EMAIL_INVALID}
            inputType={'text'}
            placeholder={'이메일'}
            onChange={onChangeInputs}
            value={userEmail}
            showUpMSG={emailMSG}
          />
          <div className={styles.register_btn} onClick={onLastCheck}>
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
