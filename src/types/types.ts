export interface ListItem {
  name: string;
  code: string;
}

export interface Country {
  name: string;
  code: string;
  emoji: string;
  languages: Languages[];
}

export interface ICountry {
  country: Country;
}

export interface Languages {
  name: string;
  code: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CountriesListProps {
  countries: ListItem[];
}

export interface ContinentsListProps {
  continents: ListItem[];
}

export interface CountryItemProps {
  country: ListItem;
}
