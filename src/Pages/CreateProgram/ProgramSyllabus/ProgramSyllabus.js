
import { SyllabusCard } from "../../../Components/Common/SyllabusCard";
import AddSyllabusForm from "../AddSyllabus/AddSyllabusForm";
import styles from "../ProgramSyllabus/ProgramSyllabus.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const ProgramSyllabuses = () => {
    return <>

<div className={cx("content-container")}>
        <subtitle1 className={cx("text")}>Content</subtitle1>
        <SyllabusCard />
        <SyllabusCard />
     
 </div>
 <div >
    <AddSyllabusForm/>
 </div>
    </>

}
export default ProgramSyllabuses;