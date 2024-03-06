import { useState } from "react";
import classNames from 'classnames/bind';
import styles from './CalenderTimeFrame.module.scss';

import {
    daysOfWeek,
    monthAbbreviation,
    filterDatesByMonth,
    getDaysInMonth,
    compareDate,
} from "./DateUtils";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";


const cx = classNames.bind(styles);

const MonthCalendar = ({
    year,
    month,
    onPrev,
    onNext,
    learningDates = [],
}) => {
    const firstDateOfMonth = new Date(year, month - 1, 1);
    const prevDayElements = [];
    for (let i = 0; i < firstDateOfMonth.getDay(); i++) {
        prevDayElements.push(
            <div key={`prev-month-calendar-${month}/${year}/${i}`}></div>
        );
    }
    return (
        <div className={cx("month-calendar")}>
            <div className={cx("header-2")}>
                <div>
                    {onPrev && (
                        <button onClick={onPrev} className={cx("button")}>
                            <LeftCircleOutlined />
                        </button>
                    )}
                </div>
                <div className={cx("title")}>
                    <span>{monthAbbreviation[month - 1]} </span>
                    <span>{year}</span>
                </div>
                <div>
                    {onNext && (
                        <button onClick={onNext} className={cx("button")}>
                            <RightCircleOutlined />
                        </button>
                    )}
                </div>
            </div>

            <div className={cx("days")}>
                {daysOfWeek.map((dayOfWeek) => (
                    <div
                        className={cx("days-detail")}
                        key={`${month}-day-of-week-${dayOfWeek}`}
                    >
                        {dayOfWeek}
                    </div>
                ))}
                {prevDayElements}
                {getDaysInMonth(year, month).map((day) => {
                    const currentDate = new Date(year, month - 1, day);
                    const today = new Date();
                    const isActive =
                        learningDates.length > 0 &&
                        learningDates.some((learningDate) =>
                            compareDate(learningDate.date, currentDate)
                        );
                    const isToday = compareDate(today, currentDate);

                    var dateClassName = "";
                    if (isToday) {
                        dateClassName += "today";
                    } else if (isActive) {
                        dateClassName += "active";
                    }

                    if (isActive) {
                        const dayInfo = learningDates.find((learningDate) =>
                            compareDate(learningDate.date, currentDate)
                        );
                        return (
                            <div key={`month-calendar-${year}/${month}/${day}`}>
                                {/* Tooltip component */}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={`month-calendar-${year}/${month}/${day}`}
                                className={`date ${dateClassName}`}
                            >
                                {day}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

const Month = ({ learningDates = [] }) => {
    const currentDate = new Date();
    const [displayingMonth, setDisplayingMonth] = useState(
        currentDate.getMonth() + 1
    );
    const [displayingYear, setDisplayingYear] = useState(
        currentDate.getFullYear()
    );
    const nextMonth = displayingMonth !== 12 ? displayingMonth + 1 : 1;
    const nextMonthYear =
        displayingMonth !== 12 ? displayingYear : displayingYear + 1;
    return (
        <div className={cx("month")}>
            <MonthCalendar
                year={displayingYear}
                month={displayingMonth}
                learningDates={learningDates}
                onPrev={() => {
                    setDisplayingMonth((prev) => {
                        if (prev === 1) {
                            setDisplayingYear(displayingYear - 1);
                            return 12;
                        }
                        return prev - 1;
                    });
                }}
            />
            <MonthCalendar
                year={nextMonthYear}
                month={nextMonth}
                learningDates={learningDates}
                onNext={() => {
                    setDisplayingMonth((prev) => {
                        if (prev === 12) {
                            setDisplayingYear(displayingYear + 1);
                            return 1;
                        }
                        return prev + 1;
                    });
                }}
            />
        </div>
    );
};

export default Month;
