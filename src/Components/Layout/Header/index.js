import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const fullName = sessionStorage.getItem("fullName");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

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
            <p className={cx("fullName")}>{fullName}</p>
            <button
              className={cx("logout-btn")}
              onClick={handleLogout}
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
