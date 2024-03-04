
import classNames from "classnames/bind";
import styles from "../ProgramMetadata/ProgramMetadata.module.scss"


const cx = classNames.bind(styles);
const ProgramMetadata = ({syllabuses, modifiedDate, modifiedBy}) => {

    //  Get total durations and hours of syllabuses 
    const [dayDurations, hourDurations] = [, ];

    return <>
    <div className={cx("description-title")}>
        <div className={cx("line-1")}>
        <p >
            {dayDurations ? <strong >{dayDurations}</strong> 
                          : <span>...</span>
            } days
            <em >({hourDurations ? hourDurations : "..."} hours)</em>
        </p>
        </div>
   
    
      
        <div className={cx("line-2")} >
        <p>
            Modified on <em >{modifiedDate}</em>
            by <strong>{modifiedBy}</strong>
        </p>
        </div>
        </div>
      
    </>
}
 
export default ProgramMetadata;