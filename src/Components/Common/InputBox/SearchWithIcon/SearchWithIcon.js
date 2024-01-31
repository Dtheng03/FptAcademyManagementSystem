import { useState } from 'react';
import { SearchIcon } from "../../Icons/DocManageIcons/index";
import './SearchWithIcon.scss';

function SearchWithIcon({ secondIcon = false }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='search_input'>
      <SearchIcon />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by..."
        className='input_contain'
      />
      {secondIcon === true && <SearchIcon />}
    </div>
  );
}

export default SearchWithIcon;
