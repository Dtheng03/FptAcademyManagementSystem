import styles from "./ErrorPage.module.scss";
import classNames from "classnames/bind";
import { Result } from 'antd';

const cx = classNames.bind(styles);

function ErrorPage() {
    return (
        <div className={cx("wrapper")}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        </div>
    );
}

export default ErrorPage;