import { FC } from 'react';
import { CountryItemProps } from '../types/types';
import styles from '../sass/_countryItem.module.scss';
import { Link } from 'react-router-dom';

const CountryItem: FC<CountryItemProps> = ({ country }) => {
  const generateLinkString = (code: string): string => {
    const codeToLowerCase = code.toLowerCase();
    return `/${codeToLowerCase}`;
  };

  return (
    <li className={styles.item}>
      <Link to={generateLinkString(country.code)}>
        <p>{country.name}</p>
        <p>{country.code}</p>
      </Link>
    </li>
  );
};

export default CountryItem;
