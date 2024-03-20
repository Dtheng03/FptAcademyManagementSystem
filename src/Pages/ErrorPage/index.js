import styles from "./ErrorPage.module.scss";
import classNames from "classnames/bind";
import { Link, useRouteError, useNavigate } from "react-router-dom";
import { Button } from "antd";

const cx = classNames.bind(styles);

function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <main className={cx("error-wrapper")}>
            <div className={cx("container")}>
                <h2 className={cx("code")}>404</h2>
                <h2 className={cx("title")}>Page not found</h2>
                <p className={cx("description")}>Sorry, we couldn’t find the page you’re looking for.</p>
                <div className={cx("btn-group")}>
                    <Button
                        type="default"
                        className={cx("btn")}
                        size="large"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back
                    </Button>
                    <Link
                        to={"/home"}
                    >
                        <Button
                            type="primary"
                            className={cx("btn")}
                            size="large"
                        >
                            Go home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ErrorPage;