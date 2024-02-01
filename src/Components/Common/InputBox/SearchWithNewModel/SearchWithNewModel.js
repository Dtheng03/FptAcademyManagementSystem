import { useState } from 'react';
import { VisibilityOffIcon } from "../../Icons/ActionIcons/index";
import styles from './SearchWithNewModel.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SearchWithNewModel({ VisibilityIcon = false }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={cx('search-input-new')}>
      <input
        className={cx('input-contain')}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by..."
      />
      {VisibilityIcon === true && <VisibilityOffIcon />}
    </div>
  );
}

export default SearchWithNewModel;
