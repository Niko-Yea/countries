import { useQuery } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import { GET_COUNTRY_BY_CODE } from '../query/countries';
import { Country, Languages } from '../types/types';
import NotFoundView from './NotFoundView';

const CountryPageView: FC = () => {
  const params = useParams();

  const [country, setCountry] = useState<Country>();
  const { data, loading, error } = useQuery(GET_COUNTRY_BY_CODE, {
    variables: { countryCode: params.code?.toUpperCase() },
  });

  useEffect(() => {
    if (!loading) {
      setCountry(data.country);
    }
  }, [data]);

  return country ? (
    <div>
      <h2>{country?.name}</h2>
      <span>{country?.code}</span>
      <span>{country?.emoji}</span>
      <h4>Languages:</h4>
      <List
        items={country.languages}
        renderItem={(language: Languages) => {
          return <li key={language.code}>{language.name}</li>;
        }}
      />
    </div>
  ) : (
    <NotFoundView />
  );
};

export default CountryPageView;
