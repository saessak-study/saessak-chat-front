import React from 'react';
import styles from '../../style/css/homePage.module.css';

const LoginMessage = ({message}) => {
    return (
        <div className={styles.typed_chat_login_logoutMessage}>
            🌱{message}🌱
        </div>
    );
}


export default LoginMessage;