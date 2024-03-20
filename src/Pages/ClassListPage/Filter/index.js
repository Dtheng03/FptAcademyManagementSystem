import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import { Space, Select, DatePicker } from "antd";
import { useState } from "react";
import Button from "../../../Components/Common/Button";

const cx = classNames.bind(styles);

function Filter({ onSubmit, onClear }) {
    const [formData, setFormData] = useState({
        locations: [],
        fromDate: null,
        toDate: null,
        classTime: [],
        status: [],
        attendee: [],
        fsu: null,
        trainer: null,
    });

    const customCheckboxOptions = [
        {
            title: "Class time",
            children: [
                { title: "Morning" },
                { title: "Noon" },
                { title: "Night" },
                { title: "Online" },
            ],
        },
        {
            title: "Status",
            children: [
                { title: "Planning" },
                { title: "Opening" },
                { title: "Closed" },
                { title: "Scheduled" }
            ],
        },
        {
            title: "Attendee",
            children: [
                { title: "Intern" },
                { title: "Fresher" },
                { title: "Online fee-fresher" },
                { title: "Offline fee-fresher" },
            ],
        },
    ];

    const locations = [
        { label: 'Can Tho', value: 'Can Tho' },
        { label: 'Da Nang', value: 'Da Nang' },
        { label: 'Ha Noi', value: 'Ha Noi' },
        { label: 'Ho Chi Minh', value: 'Ho Chi Minh' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    const handleClear = (e) => {
        e.preventDefault();
        setFormData({
            locations: [],
            fromDate: null,
            toDate: null,
            classTime: [],
            status: [],
            attendee: [],
            fsu: null,
            trainer: null,
        });
        onClear();
    }

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className={cx("filter-popip")}>
            <form>
                <div className={cx("filter-search")}>
                    {/* Filter Location */}
                    <div className={cx("location")}>
                        <div className={cx("location-title")}>Class location</div>
                        <div className={cx("select-option")}>
                            <Space
                                style={{ width: "100%" }}
                                direction="vertical"
                            >
                                <Select
                                    style={{ width: "400px" }}
                                    mode="multiple"
                                    allowClear
                                    placeholder="Please select"
                                    options={locations}
                                    onChange={(value) => handleInputChange('locations', value)}
                                    value={formData.locations}
                                />
                            </Space>
                        </div>
                    </div>
                    {/* Filter time */}
                    <div className={cx("time-line")}>
                        <div className={cx("time-title")}>Class time frame</div>
                        <div className={cx("time-content")}>
                            From
                            <Space direction="vertical" size={12}>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={(date) => handleInputChange('fromDate', date)}
                                    value={formData.fromDate}
                                />
                            </Space>
                            To
                            <Space direction="vertical" size={12}>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={(date) => handleInputChange('toDate', date)}
                                    value={formData.toDate}
                                />
                            </Space>
                        </div>
                    </div>
                </div>
                {/* Filter form */}
                <div className={cx("filter-option")}>
                    <div className={cx("filter-form")}>
                        {customCheckboxOptions.map((group) => (
                            <div key={group.title} className={cx("checkbox-form")}>
                                <div className={cx("checkbox-title")}>{group.title}</div>
                                <div className={cx("checkbox-content")}>
                                    {group.children.map((child) => (
                                        <label key={child.title}>
                                            <input
                                                type="checkbox"
                                                value={child.title}
                                                onChange={(e) => {
                                                    const { checked } = e.target;
                                                    const groupName = group.title.toLowerCase();
                                                    let selectedOptions;

                                                    if (Array.isArray(formData[groupName])) {
                                                        selectedOptions = checked
                                                            ? [...formData[groupName], child.title]
                                                            : formData[groupName].filter(option => option !== child.title);
                                                    } else {
                                                        selectedOptions = checked ? [child.title] : [];
                                                    }
                                                    handleInputChange(groupName, selectedOptions);
                                                }}
                                                checked={(formData[group.title.toLowerCase()] ?? []).includes(child.title)}
                                            />

                                            {child.title}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Filter option */}
                <div className={cx("filter-possion")}>
                    <div className={cx("possion")}>
                        <p className={cx("select-title")}>FSU</p>
                        <div className={cx("select-option")}>
                            <Select
                                placeholder={"Select"}
                                className={cx("select")}
                                onChange={(value) => handleInputChange('fsu', value)}
                                value={formData.fsu}
                            >
                                <Select.Option value="FSU" />
                                <Select.Option value="FSS" />
                                <Select.Option value="FSA" />
                            </Select>
                        </div>
                    </div>
                    <div className={cx("possion")}>
                        <p className={cx("select-title")}>Trainer</p>
                        <div className={cx("select-option")}>
                            <Select
                                placeholder={"Select"}
                                className={cx("select")}
                                onChange={(value) => handleInputChange('trainer', value)}
                                value={formData.trainer}
                            >
                                <Select.Option value="HUY" />
                                <Select.Option value="THANG" />
                                <Select.Option value="AN" />
                                <Select.Option value="NGUYEN" />
                            </Select>
                        </div>
                    </div>
                </div>

                <div className={cx("saving-button")}>
                    <Button title={"Clear"} onClick={handleClear} />
                    <Button title={"Submit"} onClick={handleSubmit} />
                </div>
            </form>
        </div>
    );
}

export default Filter;