import styles from "../SyllabusDescription/SyllabusDescription.module.scss"
import classNames from "classnames/bind";


function SyllabusDescription(props) {

    const cx = classNames.bind(styles);

    return (
        <div className={cx("description-title")}>
            <div className={cx("line-1")}>
                <h4 className={cx("day-number")}> 8</h4>
                <subtitle1 className={cx("description-text")}>
                    days (68 hours)
                </subtitle1>
            </div>

            <div className={cx("line-2")}>
                <subtitle2 className={cx("description-text")}>
                    Modified on 23/07/2022 by
                </subtitle2>
                <subtitle2 className={cx("author")}>Warrior Tran</subtitle2>
            </div>
        </div>

    )


}
export default SyllabusDescription;