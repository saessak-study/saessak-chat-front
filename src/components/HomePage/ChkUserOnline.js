import React from 'react';
import styles from '../../style/css/homePage.module.css';

const ChkUserOnline = ({ userName, userOnline }) => {
  return (
    <div>
      <div className={styles.user_status}>
        {userOnline === true ? (
          <div className={styles.user_OnlineCircle} />
        ) : (
          <div className={styles.user_OfflineCircle} />
        )}
        <div className={styles.user_name}> {userName} </div>
      </div>
    </div>
  );
};
export default ChkUserOnline;
