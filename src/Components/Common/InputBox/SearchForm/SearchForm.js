import React, { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleSearch = () => {
    if (!searchValue) {
      setValidationMessage('This field is required');
    } else {
      setValidationMessage('');
    }
  };

  return (
    <div>
      <SearchInput value={searchValue} onChange={(event) => setSearchValue(event.target.value)}/>
      {validationMessage && <p>{validationMessage}</p>}
      <SearchInput value={searchBy} onChange={() => {}} />
      <SearchInput value={searchValue} onChange={() => {}} />
      <SearchInput value={searchValue} onChange={() => {}} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchForm;