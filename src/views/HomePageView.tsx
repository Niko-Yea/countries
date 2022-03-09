import { useLazyQuery, useQuery } from '@apollo/client';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import CountryItem from '../components/CountryItem';
import List from '../components/List';
import { GET_ALL_CONTINENTS, GET_ALL_COUNTRIES, GET_COUNTRIES_BY_CONTINENT } from '../query/countries';
import { ContinentsListProps, CountriesListProps, ListItem } from '../types/types';
import Select from 'react-select';
import Filter from '../components/Filter';

export interface SelectOption {
  value: string;
  label: string;
}

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

    if (!continentsLoading && continentsData) {
      setContinents(continentsData.continents);
    }
  }, [countriesData, continentsData]);

  useEffect(() => {
    loadFilteredCountries({ variables: { continentCode: selectValue.value } });
    if (!filterLoading && filteredData && filteredData.countries.length !== 0) {
      setCountriesByContinent(filteredData.countries);
    }
  }, [selectValue, filterLoading, filteredData]);

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
    if (option) {
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

  const filteredCountries = () => {
    return selectValue.value === '' ? filterCountries(allCountries) : filterCountries(countriesByContinent);
  };

  console.log('RENDER');

  return (
    <>
      <Select
        isClearable
        onChange={option => handleSelectionChange(option)}
        options={selectedOption}
        placeholder="Filter by continent..."
      />
      <Filter value={inputValue} onChange={handleInputChange} />
      <List
        items={filteredCountries()}
        renderItem={(country: ListItem) => <CountryItem country={country} key={country.code} />}
      />
    </>
  );
};

export default HomePageView;
