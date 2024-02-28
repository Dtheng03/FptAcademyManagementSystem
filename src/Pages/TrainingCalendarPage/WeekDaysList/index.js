import styles from "./WeekDaysList.module.scss";
import classNames from "classnames/bind";
import { useState } from 'react';
import moment from 'moment';

const cx = classNames.bind(styles);

const RenderWeekDaysList = ({ year, week }) => {
    const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    // Tính ngày đầu tiên của tuần
    const startOfWeek = moment().year(year).isoWeek(week).startOf('isoWeek');
    // Tạo một mảng chứa 7 ngày của tuần
    const weekDays = [...Array(7)].map((_, index) => {
        return startOfWeek.clone().add(index, 'days');
    });

    return (
        <div className={cx("week")}>
            {weekDays.map((day, index) => (
                <span className={cx("day")} key={index}><strong>{dayOfWeek[index]}</strong> / {day.format('DD-MM')}</span>
            ))}
        </div>
    );
};

const WeekDaysList = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedWeekOfYear, setSelectedWeekOfYear] = useState(null);

    const handleDateChange = (event) => {
        console.log(event.target.value);
        const date = moment(event.target.value);
        const weekOfYear = date.isoWeek();
        setSelectedDate(date);
        setSelectedWeekOfYear(weekOfYear);
    };

    return (
        <div className={cx("week-picker")}>
            <input
                className={cx("input")}
                type="date"
                onChange={handleDateChange}
            />
            {selectedWeekOfYear !== null && (
                <RenderWeekDaysList year={selectedDate.year()} week={selectedWeekOfYear} />
            )}
        </div>
    );
};

export default WeekDaysList;
