import { gql } from '@apollo/client';

export const GET_ALL_COUNTRIES = gql`
  query {
    countries {
      name
      code
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
  query ($countryCode: ID!) {
    country(code: $countryCode) {
      name
      code
      emoji
      languages {
        name
        code
      }
    }
  }
`;

export const GET_ALL_CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query ($continentCode: String) {
    countries(filter: { continent: { eq: $continentCode } }) {
      name
      code
    }
  }
`;
