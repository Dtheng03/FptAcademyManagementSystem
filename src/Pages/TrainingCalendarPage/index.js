import styles from "./TrainingCalendarPage.module.scss";
import classNames from "classnames/bind";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { CancleIcon, FilterListIcon } from "../../Components/Common/Icons/ActionIcons";
import { HomeworkIcon } from "../../Components/Common/Icons/OtherIcons";
import { LectureIcon } from "../../Components/Common/Icons/DeliveryTypesIcons";
import { GradeIcon } from "../../Components/Common/Icons/IndicatorIcons";
import Button from "../../Components/Common/Button";
import { Tag, DatePicker } from "antd";
import { useState } from "react";
import WeekDaysList from "./WeekDaysList";

const cx = classNames.bind(styles);

function ItemOfDay({ item, type }) {
    var className;

    if (type === "Intern") {
        className = "intern"
    } else if (type === "Fresher") {
        className = "fresher"
    } else if (type === "Online fee-fresher") {
        className = "online-fee-fresher"
    } else if (type === "Offline fee-fresher") {
        className = "offline-fee-fresher"
    }

    return (
        <div className={cx("item-day-wrapper")} >
            <span className={cx("item", className)}>
                {/* {item.classCode} | {item.class} */}
                {"HCM24_CPL_REACT_02"} | {"React JS"}
            </span>
            <div className={cx("item-detail")}>
                <p className={cx("day")}>Day 10 of 20</p>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        <HomeworkIcon />
                        Location
                    </span>
                    <span className={cx("data")}>
                        HN.Fville
                    </span>
                </div>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        <LectureIcon />
                        Trainer
                    </span>
                    <span className={cx("data")}>
                        Dinh Vu Quoc Trung
                    </span>
                </div>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        <GradeIcon />
                        Admin
                    </span>
                    <span className={cx("data")}>
                        Ly Lien Lien Dung
                    </span>
                </div>
            </div>
        </div>
    );
}

function ItemOfWeek({ item, type }) {
    var className;

    if (type === "Intern") {
        className = "intern"
    } else if (type === "Fresher") {
        className = "fresher"
    } else if (type === "Online fee-fresher") {
        className = "online-fee-fresher"
    } else if (type === "Offline fee-fresher") {
        className = "offline-fee-fresher"
    }

    return (
        <div className={cx("item-week-wrapper")} >
            <span className={cx("item", className)}>
                {/* {item.classCode}*/}
                {"HCM24_CPL_REACT_02"}
            </span>
            <div className={cx("item-detail")}>
                <p className={cx("class")}>{"React Js"}</p>
                <p className={cx("day")}>Day 10 of 20</p>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        Unit {"6"}
                    </span>
                    <span className={cx("data")}>
                        {"Class and Function Component "}
                    </span>
                </div>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        Location
                    </span>
                    <span className={cx("data")}>
                        HN.Fville
                    </span>
                </div>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        Trainer
                    </span>
                    <span className={cx("data")}>
                        Dinh Vu Quoc Trung
                    </span>
                </div>
                <div className={cx("info")}>
                    <span className={cx("label")}>
                        Admin
                    </span>
                    <span className={cx("data")}>
                        Ly Lien Lien Dung
                    </span>
                </div>
            </div>
        </div>
    );
}

function TrainingCalendarPage() {
    const [filterLs, setFilterLs] = useState(["Ho Chi Minh", "BA"]);

    const [tab, setTab] = useState("Day");
    const [showMorning, setShowMoring] = useState(true);
    const [showNoon, setShowNoon] = useState(true);
    const [showNight, setShowNight] = useState(true);

    const [showDataWeek, setShowDataWeek] = useState(false);

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
                <span className={cx("content", tab === "Day" ? "day" : "")} onClick={() => { setTab("Day") }}>Day</span>
                <span className={cx("content", tab === "Week" ? "week" : "")} onClick={() => { setTab("Week") }} >Week</span>
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
                                <div className={cx("items")}>
                                    <ItemOfDay type={"Intern"} />
                                    <ItemOfDay type={"Fresher"} />
                                    <ItemOfDay type={"Online fee-fresher"} />
                                    <ItemOfDay type={"Offline fee-fresher"} />
                                    <ItemOfDay type={"Intern"} />
                                    <ItemOfDay type={"Fresher"} />
                                    <ItemOfDay type={"Online fee-fresher"} />
                                    <ItemOfDay type={"Offline fee-fresher"} />
                                </div>
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
                        <WeekDaysList showData={() => setShowDataWeek(true)} />
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowMoring(!showMorning) }}>Morning (8:00 - 12:00)</p>
                        {showDataWeek && showMorning && <div className={cx("record")}>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                            <div className={cx("col")}>
                                <ItemOfWeek type={"Intern"} />
                                <ItemOfWeek type={"Fresher"} />
                                <ItemOfWeek type={"Online fee-fresher"} />
                                <ItemOfWeek type={"Offline fee-fresher"} />
                            </div>
                        </div>}
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowNoon(!showNoon) }}>Noon (13:00 - 17:00)</p>
                    </div>

                    <div className={cx("section")}>
                        <p className={cx("title")} onClick={() => { setShowNight(!showNight) }}>Night (18:00 - 22:00)</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default TrainingCalendarPage;