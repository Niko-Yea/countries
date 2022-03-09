export interface ListItem {
  name: string;
  code: string;
}

export interface CountriesListProps {
  countries: ListItem[];
}

export interface CountryItemProps {
  country: ListItem;
}

export interface ContinentsListProps {
  continents: ListItem[];
}

export interface ContinentItemProps {
  continent: ListItem;
}

export interface Country {
  name: string;
  code: string;
  emoji: string;
  languages: Languages[];
}

export interface Languages {
  name: string;
  code: string;
}
