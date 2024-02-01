import styles from "./Button.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Button({ title, firstIcon, secondIcon, type = "normal", onClick = () => { } }) {

    return (
        <button
            className={cx("btn", type)}
            onClick={onClick}
        >
            {firstIcon}
            {title && <span className={cx("title")}>{title}</span>}
            {secondIcon}
        </button>
    );
}

export default Button;