import React from 'react';
import styles from '../../style/css/homePage.module.css';

const ChkUserOnline = ({ userName, userOnline }) => {
  return (
    <div>
      <div className={styles.user_status}>
        <div> {userName} </div>
        {userOnline === true ? (
          <div className={styles.user_OnlineCircle}></div>
        ) : (
          <div className={styles.user_OfflineCircle}></div>
        )}
      </div>
    </div>
  );
};
export default ChkUserOnline;
