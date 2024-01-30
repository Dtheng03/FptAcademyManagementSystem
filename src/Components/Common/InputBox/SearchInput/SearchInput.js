import React, { useState } from 'react';
import './SearchInput.scss';

function SearchInput({ label, validationMessage }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange} placeholder="Search by..." />
      {validationMessage && <p>{validationMessage}</p>}
    </div>
  );
}

export default SearchInput;