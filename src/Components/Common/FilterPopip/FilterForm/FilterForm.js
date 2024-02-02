import React, { useEffect } from "react";
import "./FilterForm.scss";

const customCheckboxOptions = [
    {
        title: "Class time",
        to: "",
        children: [
            { title: "Morning", to: "" },
            { title: "Noon", to: "" },
            { title: "Night", to: "" },
            { title: "Online", to: "" },
        ],
    },
    {
        title: "Status",
        to: "",
        children: [
            { title: "Planning", to: "" },
            { title: "Opening", to: "" },
            { title: "Closed", to: "" },
        ],
    },
    {
        title: "Attendee",
        to: "",
        children: [
            { title: "Intern", to: "" },
            { title: "Fresher", to: "" },
            { title: "Online_fee_fresher", to: "" },
            { title: "Offline_fee_fresher", to: "" },
        ],
    },
];

const FilterForm = ({ onClear }) => {
    const [selectedValues, setSelectedValues] = React.useState([]);

    useEffect(() => {
        if (onClear) {
            // Clear the selected values when onClear prop is true
            setSelectedValues([]);
        }
    }, [onClear]);

    const handleCheckboxChange = (value) => {
        setSelectedValues((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((val) => val !== value);
            } else {
                return [...prevValues, value];
            }
        });
    };

    return (
        <div className="filter-form">
            {customCheckboxOptions.map((group) => (
                <div key={group.title} className="checkbox-form">
                    <div className="checkbox-title">{group.title}</div>
                    <div className="checkbox-group">
                        {group.children.map((child) => (
                            <label key={child.title}>
                                <input
                                    type="checkbox"
                                    value={child.title}
                                    checked={selectedValues.includes(child.title)}
                                    onChange={() => handleCheckboxChange(child.title)}
                                />
                                {child.title}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterForm;
