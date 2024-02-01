import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Avatar } from "antd";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx("header")}>
            <div className={cx("logo")} />
            <div className={cx("body")}>
                <div className={cx("mini-logo")}>
                    <div className={cx("gate-logo")} />
                    <span className="caption2">uniGate</span>
                </div>
                <div className={cx("user")}>
                    <Avatar size={"large"} />
                    <div className={cx("action")}>
                        <p className="caption1">Warrior Tran</p>
                        <p className="caption2">Log out</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;