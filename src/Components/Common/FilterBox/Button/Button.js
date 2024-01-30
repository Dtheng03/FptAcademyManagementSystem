import {useState} from "react";
import { FilterListIcon } from "../../../Common/Icons/ActionIcons/index";
import "./Button.scss";

const Button = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleFilterClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <button className="button_filter_list" onClick={handleFilterClick}>
        <FilterListIcon />
        {/* {isPopupVisible ? 'Hide Filter' : 'Show Filter'} */}
        <p>Filter</p>
      </button>
    </>
  );
};

export default Button;
