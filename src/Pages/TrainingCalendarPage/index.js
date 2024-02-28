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
    const [showMorning, setShowMoring] = useState(true);
    const [showNoon, setShowNoon] = useState(true);
    const [showNight, setShowNight] = useState(true);

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

            {/* tab day */}
            {tab === "Day" &&
                <div className={cx("section-day")}>
                    <div className={cx("date-picker")}>
                        <DatePicker
                            className={cx("input")}
                        />
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowMoring(!showMorning) }}>Morning (8:00 - 12:00)</p>
                        {showMorning && <div className={cx("data")}>
                            <div className={cx("record")}>
                                <span className={cx("time")}>8:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>8:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>9:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>9:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>10:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>10:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>11:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>11:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>12:00</span>
                            </div>
                        </div>}
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowNoon(!showNoon) }}>Noon (13:00 - 17:00)</p>
                        {showNoon && <div className={cx("data")}>
                            <div className={cx("record")}>
                                <span className={cx("time")}>13:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>13:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>14:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>14:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>15:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>15:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>16:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>16:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>17:00</span>
                            </div>
                        </div>}
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowNight(!showNight) }}>Night (18:00 - 22:00)</p>
                        {showNight && <div className={cx("data")}>
                            <div className={cx("record")}>
                                <span className={cx("time")}>18:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>18:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>19:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>19:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>20:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>20:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>21:00</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>21:30</span>
                            </div>
                            <div className={cx("record")}>
                                <span className={cx("time")}>22:00</span>
                            </div>
                        </div>}
                    </div>
                </div>
            }

            {/* tab week */}
            {tab === "Week" &&
                <div className={cx("section-week")}>
                    <div className={cx("date-picker")}>
                        <DatePicker
                            className={cx("input")}
                            picker="week"
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default TrainingCalendarPage;