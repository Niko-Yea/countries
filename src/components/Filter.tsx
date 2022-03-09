import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<InputProps> = ({ value, onChange }) => {
  return <input onChange={onChange} type="text" name="filter" value={value} />;
};

export default Filter;
