import React from "react";
import styles from "./Styles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function AttendeeStyle({ attendee }) {
    var className, title;
    if (attendee === "Fresher") {
        className = "fresher"
        title = "Fresher"
    } else if (attendee === "Intern") {
        className = "intern"
        title = "Intern"
    } else if (attendee === "Online fee-fresher") {
        className = "online-fee-fresher"
        title = "Online fee-fresher"
    } else if (attendee === "Offline fee-fresher") {
        className = "offline-fee-fresher"
        title = "Offline fee-fresher"
    }

    return (
        <span className={cx("attendee-style", className)}>
            {title}
        </span>
    );
}

export function StatusStyle({ status }) {
    var className, title;
    if (status === "Planning") {
        className = "planning"
        title = "Planning"
    } else if (status === "Opening") {
        className = "opening"
        title = "Opening"
    } else if (status === "Inactive") {
        className = "inactive"
        title = "Inactive"
    }

    return (
        <span className={cx("status-style", className)}>
            {title}
        </span>
    );
}
