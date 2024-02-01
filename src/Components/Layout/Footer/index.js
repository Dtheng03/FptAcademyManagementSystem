import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx("footer")}>
            <p className="footnote">Copyright @2022 BA Warrior. All right reserved</p>
        </footer>
    );
}

export default Footer;