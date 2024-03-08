import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import { Space, Select, DatePicker } from "antd";
import { useState } from "react";
import Button from "../../../Components/Common/Button";

const cx = classNames.bind(styles);

function Filter() {
    const [clearFlag, setClearFlag] = useState(false);

    const locations = [
        { label: 'Can Tho', value: 'Can Tho' },
        { label: 'Da Nang', value: 'Da Nang' },
        { label: 'Ha Noi', value: 'Ha Noi' },
        { label: 'Ho Chi Minh', value: 'Ho Chi Minh' }
    ];

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

    const handleSubmit = () => {

    }

    const handleClear = (e) => {
        e.preventDefault();
        setClearFlag((prev) => !prev);
    }

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
                                    placeholder="--/--/----"
                                    format="DD/MM/YYYY"
                                />
                            </Space>
                            To
                            <Space direction="vertical" size={12}>
                                <DatePicker
                                    placeholder="--/--/----"
                                    format="DD/MM/YYYY"
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