import { useState } from "react";
import "./SearchWithNoIcon.scss";

function SearchWithNoIcon({ validationMessage }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="search_input_no_icon">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by..."
        className="input_contain"
      />
      {/* {validationMessage && <p>{validationMessage}</p>} */}
    </div>
  );
}

export default SearchWithNoIcon;