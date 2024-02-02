import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
// import { DownOutlined } from "@ant-design/icons";
import "./FilterLocation.scss";

// const MAX_COUNT = 3;

const options = [
    {
        label: "TPHCM",
        value: "TPHCM",
    },
    {
        label: "Hà Nội",
        value: "Hà Nội",
    },
    {
        label: "Đà Nẵng",
        value: "Đà Nẵng",
    },
    {
        label: "Cần Thơ",
        value: "Cần Thơ",
    },
];

const FilterLocation = ({ onClear }) => {
    const [value, setValue] = useState([]);

    // const suffix = (
    //   <>
    //     <span>
    //       {value.length} / {MAX_COUNT}
    //     </span>
    //     <DownOutlined />
    //   </>
    // );

    // const handleChange = (selectedValues) => {
    //   if (selectedValues.length <= MAX_COUNT) {
    //     setValue(selectedValues);
    //   } else {
    //     toast.error(`You can select up to ${MAX_COUNT} items.`);
    //   }
    // };

    const handleChange = (selectedValues) => {
        setValue(selectedValues);
        if (selectedValues.length > 0) {
            console.log("Location: " + selectedValues);
        } else {
            console.log("Location: " + selectedValues);
        }
    };

    useEffect(() => {
        if (onClear) {
            // Clear the selected values when onClear prop is true
            setValue([]);
        }
    }, [onClear]);

    return (
        <div className="location">
            <div className="title">
                <p>Class location</p>
            </div>
            <div className="select_option">
                <Space
                    style={{
                        width: "100%",
                    }}
                    direction="vertical"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select"
                        value={value}
                        onChange={handleChange}
                        options={options}
                    // maxTagCount={MAX_COUNT}
                    // maxTagTextLength={10}
                    // suffixIcon={suffix}
                    />
                </Space>
            </div>
        </div>
    );
};

export default FilterLocation;
