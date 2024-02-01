import { useState } from "react";
import styles from "./SearchWithNoIcon.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchWithNoIcon({ validationMessage }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={cx("search-input-no-icon")}>
      <input
        className={cx("input-contain")}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by..."
      />
      {/* {validationMessage && <p>{validationMessage}</p>} */}
    </div>
  );
}

export default SearchWithNoIcon;