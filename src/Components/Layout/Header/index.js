import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Avatar } from "antd";

const cx = classNames.bind(styles);

function Header({ onLogout }) {
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
            <button
              style={{
                display: "block",
                margin: "0 0",
                padding: "10px 0",
                cursor: "pointer",
                border: "none",
                color: "#fff",
                backgroundColor: "#2D3748",
              }}
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
