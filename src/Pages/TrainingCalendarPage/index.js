import styles from "./TrainingCalendarPage.module.scss";
import classNames from "classnames/bind";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { AddIcon, SortIcon, CancleIcon, FilterListIcon } from "../../Components/Common/Icons/ActionIcons";
import Button from "../../Components/Common/Button";
import { Tag, DatePicker } from "antd";
import { useState } from "react";

const cx = classNames.bind(styles);

function TrainingCalendarPage() {

    const [filterLs, setFilterLs] = useState(["Ho Chi Minh", "BA"]);

    const [tab, setTab] = useState("Day");
    return (
        <div className={cx("container")}>
            <h4 className={cx("header")}>Training Calendar</h4>

            {/* phan search va filter */}
            <div className={cx("action")}>
                <div className={cx("search")}>
                    <div className={cx('search-input')}>
                        <SearchIcon />
                        <input
                            className={cx('input-contain')}
                            type="text"
                            placeholder="Search by..."
                        />
                    </div>
                    <Button firstIcon={<FilterListIcon />} title={"Filter"} />
                </div>
            </div>

            {/* phan hien thi gia tri filter da chon */}
            <div className={cx("filter-result")}>
                {filterLs.map(((item, index) => (
                    <Tag
                        key={index}
                        className={cx("filter")}
                        color="#474747"
                    >
                        {item}
                    </Tag>
                )))}
                {filterLs.length > 0 &&
                    < button
                        className={cx("clear")}
                        onClick={() => {
                            setFilterLs([]);
                            // handleFilter();
                        }}
                    >
                        <CancleIcon />
                    </button>}
            </div>

            {/* phan chon day hoac week */}
            <div className={cx("tab")}>
                <label className={cx("content", tab === "Day" ? "day" : "")} onClick={() => { setTab("Day") }}>Day</label>
                <input className={cx("checkbox")} type="checkbox" checked={tab === "Day"} onChange={() => { setTab("Day") }} />

                <label className={cx("content", tab === "Week" ? "week" : "")} onClick={() => { setTab("Week") }} >Week</label>
                <input className={cx("checkbox")} type="checkbox" checked={tab === "Week"} onChange={() => { setTab("Week") }} />
            </div>

            {/* phan day */}
            <div className={cx("section-day")}>
                <DatePicker
                    className={cx("date-picker")}
                    popupClassName={cx("popup-date-picker")}
                />
            </div>
        </div>
    );
}

export default TrainingCalendarPage;