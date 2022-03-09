import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';

import styles from '../sass/_input.module.scss';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      placeholder="Search by country..."
      className={styles.input}
      onChange={onChange}
      type="text"
      name="filter"
      value={value}
    />
  );
};

export default Filter;
