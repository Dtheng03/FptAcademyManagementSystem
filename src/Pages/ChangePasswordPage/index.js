import FormChangePass from "./FormChangePass";
import styles from "./ChangePasswordPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ChangePasswordPage() {
    return (
        <div className={cx("wrapper")} >
            <h4 className={cx("title")}>Change Password</h4>
            <FormChangePass />
        </div>
    );
}

export default ChangePasswordPage;