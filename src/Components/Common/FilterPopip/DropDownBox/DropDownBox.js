// DropDownBox.jsx

import React, { useState, useEffect } from "react";
import "./DropDownBox.scss";

const DropDownBoxOptions = {
    1: [
        {
            label: "All",
            value: "All",
        },
        {
            label: "Planning",
            value: "Planning",
        },
    ],
    2: [

        {
            label: "Opening",
            value: "Opening",
        },
        {
            label: "Closed",
            value: "Closed",
        },
    ],
};

const DropDownBox = ({ id, onClear }) => {
    const [value, setValue] = useState(""); // Ensure value is a scalar

    useEffect(() => {
        setValue(""); // Reset value when the onClear prop is triggered
    }, [onClear]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
    };

    const title = id === 1 ? "FSU" : id === 2 ? "Trainer" : "";
    const options = DropDownBoxOptions[id] || [];

    return (
        <div className="Title">
            <p>{title}</p>
            <div className="select_option">
                <select value={value} onChange={handleChange}>
                    <option hidden value="">
                        Select
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DropDownBox;
