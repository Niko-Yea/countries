import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

import styles from '../sass/_spiner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <ClipLoader />
    </div>
  );
};

export default Spinner;
