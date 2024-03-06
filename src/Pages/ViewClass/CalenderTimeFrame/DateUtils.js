export function getDaysInMonth(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }

    return daysArray;
}

export function filterDatesByMonth(dates, desiredMonth) {
    return dates.filter((date) => date.getMonth() + 1 === desiredMonth);
}

export function getMonthsInYear(dateArray, year) {
    const monthsInYear = [];

    for (const date of dateArray) {
        if (date.getFullYear() === year && !monthsInYear.includes(date.getMonth())) {
            monthsInYear.push(date.getMonth());
        }
    }

    return monthsInYear;
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
}


export const monthAbbreviation = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
]

export function compareDate(date1, date2) {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
}
