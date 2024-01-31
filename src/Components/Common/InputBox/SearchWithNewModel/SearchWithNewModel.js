import { useState } from 'react';
import { VisibilityOffIcon } from "../../Icons/ActionIcons/index";
import './SearchWithNewModel.scss';

function SearchWithNewModel({ VisibilityIcon = false }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='search_input_new'>
      <input
        type="text"
        value={value}
        onChange={handleChange} 
        placeholder="Search by..."
        className='input_contain'
      />
      {VisibilityIcon === true && <VisibilityOffIcon />}
    </div>
  );
}

export default SearchWithNewModel;
