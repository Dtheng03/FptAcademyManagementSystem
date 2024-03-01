import styles from "../SyllabusDescription/SyllabusDescription.module.scss"
import classNames from "classnames/bind";


function SyllabusDescription(props) {

    const cx = classNames.bind(styles);

    return (
        <div className={cx("description-title")}>
            <div className={cx("line-1")}>
                <h4 className={cx("day-number")}> 8</h4>
                <p className={cx("description-text")}>
                    days (68 hours)
                </p>
            </div>

            <div className={cx("line-2")}>
                <p className={cx("description-text")}>
                    Modified on 23/07/2022 by
                </p>
                <p className={cx("author")}>Warrior Tran</p>
            </div>
        </div>

    )


}
export default SyllabusDescription;