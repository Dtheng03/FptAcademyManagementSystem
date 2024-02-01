import { useState } from 'react';
import { SearchIcon } from "../../Icons/DocManageIcons/index";
import styles from './SearchWithIcon.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchWithIcon({ secondIcon = false }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={cx('search-input')}>
      <SearchIcon />
      <input
        className={cx('input-contain')}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by..."
      />
      {secondIcon === true && <SearchIcon />}
    </div>
  );
}

export default SearchWithIcon;
