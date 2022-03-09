import { useQuery } from '@apollo/client';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

import { GET_COUNTRY_BY_CODE } from '../query/countries';
import { Country, ICountry, Languages } from '../types/types';

import NotFoundView from './NotFoundView';
import List from '../components/List';
import Spinner from '../components/Spinner';

import styles from '../sass/_countryPage.module.scss';

const CountryPageView: FC = () => {
  const params = useParams();

  const [country, setCountry] = useState<Country | null>(null);
  const { data, loading, error } = useQuery<ICountry>(GET_COUNTRY_BY_CODE, {
    variables: { countryCode: params.code?.toUpperCase() },
    onCompleted: result => setCountry((result && result.country) || null),
  });

  if (loading) {
    return <Spinner />;
  }

  if (!country && !loading) {
    return <NotFoundView />;
  }

  return (
    country && (
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{country.name}</h2>
          <ReactCountryFlag
            className={styles.emoji}
            countryCode={country.code}
            style={{
              fontSize: '100px',
              height: '75px',
            }}
            aria-label={country.code}
            svg
          />
        </div>

        <div className={styles.contentWrapper}>
          <p>Country code: {country.code}</p>
          <h4 className={styles.title}>Languages:</h4>
          <List
            className={styles.list}
            items={country.languages}
            renderItem={(language: Languages) => {
              return (
                <li className={styles.listItem} key={language.code}>
                  {language.name}
                </li>
              );
            }}
          />
        </div>
      </div>
    )
  );
};

export default CountryPageView;
