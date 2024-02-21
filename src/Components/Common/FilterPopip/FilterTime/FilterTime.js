import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import "./FilterTime.scss";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY"];

const FilterTime = ({ onClear }) => {
    const defaultDateValue = null;
    const [fromDate, setFromDate] = useState(defaultDateValue);
    const [toDate, setToDate] = useState(defaultDateValue);

    useEffect(() => {
        if (onClear) {
            // Clear date values when onClear prop is true
            setFromDate(defaultDateValue);
            setToDate(defaultDateValue);
        }
    }, [onClear]);

    return (
        <div className="time_line">
            <div className="time_line_title">Class time frame</div>
            <div className="time_line_content">
                <p>from</p>
                <Space direction="vertical" size={12}>
                    <DatePicker
                        placeholder="--/--/----"
                        format={dateFormatList}
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                    />
                </Space>
                <p>to</p>
                <Space direction="vertical" size={12}>
                    <DatePicker
                        placeholder="--/--/----"
                        format={dateFormatList}
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                    />
                </Space>
            </div>
        </div>
    );
};

export default FilterTime;
