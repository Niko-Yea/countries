import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CountryItemProps } from '../types/types';

import styles from '../sass/_item.module.scss';

const CountryItem: FC<CountryItemProps> = ({ country }) => {
  return (
    <li className={styles.item}>
      <Link className={styles.link} to={`/${country.code.toLowerCase()}`}>
        <div className={styles.thumb}>
          <p>{country.name}</p>
          <span>{country.code}</span>
        </div>
      </Link>
    </li>
  );
};

export default CountryItem;
