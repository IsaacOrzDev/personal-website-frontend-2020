import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {}

const UpIcon: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <svg x="0px" y="0px" viewBox="0 0 490.544 490.544">
        <path
          className={`${styles.path} ${styles[props.theme]}`}
          d="M479.88,277.266c-2.831,0.005-5.548-1.115-7.552-3.115L245.213,47.015L18.098,274.151
	c-4.237,4.093-10.99,3.975-15.083-0.262c-3.992-4.134-3.992-10.687,0-14.82L237.682,24.401c4.165-4.164,10.917-4.164,15.083,0
	l234.667,234.667c4.159,4.172,4.148,10.926-0.024,15.085C485.409,276.146,482.702,277.265,479.88,277.266z"
        />
        <path
          className={`${styles.path} ${styles[props.theme]}`}
          d="M479.88,469.266c-2.831,0.005-5.548-1.115-7.552-3.115L245.213,239.015L18.098,466.151
	c-4.237,4.093-10.99,3.976-15.083-0.262c-3.993-4.134-3.993-10.687,0-14.821l234.667-234.667c4.165-4.164,10.917-4.164,15.083,0
	l234.667,234.667c4.159,4.172,4.148,10.926-0.024,15.085C485.409,468.146,482.702,469.265,479.88,469.266z"
        />
      </svg>
    </div>
  );
};

export default UpIcon;
