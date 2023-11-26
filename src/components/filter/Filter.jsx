import React from 'react';
import css from './Filter.module.css';
export const Filter = ({ value, onChange }) => {
  return (
    <label htmlFor="filter">
      <span className={css.input_names}>Find contacts by name</span>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};
