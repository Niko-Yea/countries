import { useLazyQuery, useQuery } from '@apollo/client';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Select from 'react-select';

import { GET_ALL_CONTINENTS, GET_ALL_COUNTRIES, GET_COUNTRIES_BY_CONTINENT } from '../query/countries';
import { ContinentsListProps, CountriesListProps, ListItem, SelectOption } from '../types/types';

import CountryItem from '../components/CountryItem';
import List from '../components/List';
import Filter from '../components/Filter';
import Spinner from '../components/Spinner';

import styles from '../sass/_homePage.module.scss';
import listStyles from '../sass/_list.module.scss';

const HomePageView: FC = () => {
  const initialSelectState: SelectOption = {
    value: '',
    label: '',
  };
  const [allCountries, setCountries] = useState<ListItem[]>([]);
  const [continents, setContinents] = useState<ListItem[]>([]);
  const [countriesByContinent, setCountriesByContinent] = useState<ListItem[]>([]);
  const [selectValue, setSelectValue] = useState<SelectOption>(initialSelectState);
  const [inputValue, setInputValue] = useState<string>('');

  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useQuery<CountriesListProps>(GET_ALL_COUNTRIES);

  const {
    data: continentsData,
    loading: continentsLoading,
    error: continentsError,
  } = useQuery<ContinentsListProps>(GET_ALL_CONTINENTS);

  const [loadFilteredCountries, { data: filteredData, loading: filterLoading, error: filterError }] =
    useLazyQuery<CountriesListProps>(GET_COUNTRIES_BY_CONTINENT);

  useEffect(() => {
    if (!countriesLoading && countriesData) {
      setCountries(countriesData.countries);
    }
  }, [countriesData]);

  useEffect(() => {
    if (!continentsLoading && continentsData) {
      setContinents(continentsData.continents);
    }
  }, [continentsData]);

  useEffect(() => {
    if (selectValue.value) {
      loadFilteredCountries({ variables: { continentCode: selectValue.value } });
    }
  }, [selectValue]);

  useEffect(() => {
    if (!filterLoading && filteredData && filteredData.countries.length) {
      setCountriesByContinent(filteredData.countries);
    }
  }, [filteredData]);

  const selectedOption: SelectOption[] = continents.map(continent => {
    return {
      value: continent.code,
      label: continent.name,
    };
  });

  const handleSelectionChange = (option: SelectOption | null) => {
    if (!option) {
      setSelectValue(initialSelectState);
      countriesData && setCountries(countriesData?.countries);
    }
    if (option && option.value !== selectValue.value) {
      setSelectValue(option);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filterCountries = (countries: ListItem[]) => {
    const lowerCaseString = inputValue.toLowerCase();
    return countries.filter(country => {
      return country.name.toLowerCase().includes(lowerCaseString);
    });
  };

  const getFilteredCountries = () => {
    return filterCountries(selectValue.value === '' ? allCountries : countriesByContinent);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtres}>
        <Select
          className={styles.select}
          isClearable
          onChange={option => handleSelectionChange(option)}
          options={selectedOption}
          placeholder="Filter by continent..."
        />
        <Filter value={inputValue} onChange={handleInputChange} />
      </div>
      {getFilteredCountries().length ? (
        <List
          className={listStyles.list}
          items={getFilteredCountries()}
          renderItem={(country: ListItem) => <CountryItem country={country} key={country.code} />}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default HomePageView;
