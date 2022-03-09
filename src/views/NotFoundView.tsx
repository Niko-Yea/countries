import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from '../sass/_notFound.module.scss';

const NotFoundView: FC = () => {
  return (
    <div className={styles.container}>
      <h2>Page not found</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFoundView;
