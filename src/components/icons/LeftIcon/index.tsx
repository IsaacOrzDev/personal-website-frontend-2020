import React from 'react';
import styles from './style.module.scss';
import { ThemeProps } from 'types/Props';

interface Props extends ThemeProps {}

const LeftIcon: React.FC<Props> = props => {
  return (
    <div className={`${styles.container} ${styles[props.theme]}`}>
      <svg viewBox="0 0 490.787 490.787">
        <path
          className={styles.path}
          d="M362.671,490.787c-2.831,0.005-5.548-1.115-7.552-3.115L120.452,253.006c-4.164-4.165-4.164-10.917,0-15.083L355.119,3.256
	c4.093-4.237,10.845-4.354,15.083-0.262c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262
	L143.087,245.454l227.136,227.115c4.171,4.16,4.179,10.914,0.019,15.085C368.236,489.664,365.511,490.792,362.671,490.787z"
        />
      </svg>
    </div>
  );
};

export default LeftIcon;
