import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FindIdInput from '../components/FindUserInfo/FindIdInput';
import FindPwInput from '../components/FindUserInfo/FindPwInput';
import styles from '../style/css/findUserInfoPage.module.css';
import { regEmail } from '../constants/regEx';
import axios from 'axios';

const FindUserInfoPage = () => {
  const [inputs, setInput] = useState({
    checkId: '',
    checkName: '',
    checkEmail: '',
  });
  const { checkId, checkName, checkEmail } = inputs;
  const [idEmpty, setIdEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [idPwToggle, setIdPwToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [returnId, setReturnId] = useState('');
  const [returnPw, setReturnPw] = useState('');

  const modalForId = 'id';
  const modalForPw = 'password';

  const onChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInput({
      checkId: '',
      checkName: '',
      checkEmail: '',
    });
  };

  const getFindId = async () => {
    let body = {
      email: checkEmail,
      name: checkName,
    };
    setReturnId('');
    await axios
      .post('/find-id', body)
      .then((response) => {
        setModal(true);
        console.log(response.data);
        setReturnId(response.data.responseMessage.id);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error: ', error.response.data.responseMessage);
        alert(error.response.data.responseMessage);
      });
  };

  const getFindPw = async () => {
    let body = {
      email: checkEmail,
      id: checkId,
      name: checkName,
    };
    setReturnPw('');
    await axios
      .post('/find-password', body)
      .then((response) => {
        setModal(true);
        console.log(response.data);
        setReturnPw(response.data.responseMessage.password);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error: ', error.response.data.responseMessage);
        alert(error.response.data.responseMessage);
      });
  };

  /** ?????? ?????? ??? ?????? ??? ??????????????? ????????? */
  const IdAndPwToggleHandler = () => {
    setIdPwToggle(!idPwToggle);
    setEmailValid(false);
    setNameEmpty(false);
    setEmailEmpty(false);
    onReset();
  };

  /** ????????? ????????? ?????? ?????? */
  const onCheckEmailValid = () => {
    if (regEmail.test(checkEmail)) {
      setEmailEmpty(false);
      setNameEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
    } else {
      setEmailValid(true);
      setEmailEmpty(false);
      setNameEmpty(false);
      setIdEmpty(false);
    }
  };

  const onFindIdHandler = (e) => {
    e.preventDefault();
    if ((!checkName && !checkEmail) || !checkName) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      return;
    }

    if (!checkEmail) {
      setEmailEmpty(true);
      setNameEmpty(false);
      setEmailValid(false);
      return;
    }

    if (checkName && checkEmail) {
      onCheckEmailValid();
      getFindId();
      getFindId();
    }
  };

  const onFindPwHandler = (e) => {
    e.preventDefault();
    if ((!checkName && !checkEmail && !checkId) || !checkName) {
      setNameEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
      return;
    }

    if (!checkId) {
      setIdEmpty(true);
      setEmailEmpty(false);
      setEmailValid(false);
      setNameEmpty(false);
      return;
    }

    if (!checkEmail) {
      setEmailEmpty(true);
      setNameEmpty(false);
      setEmailValid(false);
      setIdEmpty(false);
      return;
    }

    if (checkName && checkEmail && checkId) {
      onCheckEmailValid();
      getFindPw();
      getFindPw();
    }
  };

  const modalHandler = () => {
    setModal(false);
  };

  /** user????????? ????????? ?????? ???????????? */
  useEffect(() => {
    let userInfo = localStorage.getItem('id');
    if (userInfo) {
      navigate('/mainchat');
    }
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.app_name}>????SaessakChat????</div>
      <div className={styles.findInfo_box}>
        <div
          className={`${
            idPwToggle ? styles.findId : styles.findIdAndPw_toggle
          }`}
        >
          <span onClick={idPwToggle ? null : IdAndPwToggleHandler}>
            ????????? ??????
          </span>
        </div>
        <div
          className={`${
            idPwToggle ? styles.findIdAndPw_toggle : styles.findPw
          }`}
        >
          <span onClick={idPwToggle ? IdAndPwToggleHandler : null}>
            ???????????? ??????
          </span>
        </div>
      </div>
      <div className={styles.findIdAndPw_container}>
        {idPwToggle ? (
          <FindIdInput
            modal={modal}
            onFindIdHandler={onFindIdHandler}
            onChange={onChange}
            modalHandler={modalHandler}
            nameEmpty={nameEmpty}
            emailEmpty={emailEmpty}
            emailValid={emailValid}
            checkName={checkName}
            checkEmail={checkEmail}
            modalFor={modalForId}
            modalMessage={returnId}
          />
        ) : (
          <FindPwInput
            modal={modal}
            onFindPwHandler={onFindPwHandler}
            onChange={onChange}
            modalHandler={modalHandler}
            nameEmpty={nameEmpty}
            emailEmpty={emailEmpty}
            emailValid={emailValid}
            idEmpty={idEmpty}
            checkName={checkName}
            checkEmail={checkEmail}
            checkId={checkId}
            modalFor={modalForPw}
            modalMessage={returnPw}
          />
        )}
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className={styles.navigate_text}>????????? ???????????? ????????????</div>
      </Link>
    </div>
  );
};

export default FindUserInfoPage;
