
import { useState } from 'react';
import { SearchIcon } from '../../../Components/Common/Icons/DocManageIcons';
import styles from './AddSyllabus.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SuggestCell = () => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '10px 16px',
        backgroundColor: 'white'
    }}>
        <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontSize: '16px',
            letterSpacing: '0px'
        }}>
            Linux
        </p>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#323232'
        }}>
            <em>12hrs</em>
            <em>23/07/2022 by Johny Deep</em>
        </div>
    </div>
}

const AddSyllabusForm = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    return <>
        <form className={cx("add-syllabus-form")}>
            <div className={cx("text")} htmlFor="">Select syllabus</div>
            <div style={{ position: 'relative' }}>
                <div className={cx("search-input")}>
                    
                    <SearchIcon />
                    <input   className={cx("input-contain")} type="text" name="search" placeholder="Search.." value={inputValue} onChange={handleInputChange} />
                </div>
                {inputValue &&
                    <ul className={cx("add-syllabus-form__suggests")}>
                        <li className={cx("suggest")}>
                            <SuggestCell />
                        </li>
                        <li className={cx("suggest")}>
                            <SuggestCell />
                        </li>
                    </ul>
                }
            </div>

        </form>
    </>
}

export default AddSyllabusForm;