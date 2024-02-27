import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import { FilterListIcon } from "../../../Components/Common/Icons/ActionIcons";
import { Popover } from 'antd';
import { useState } from "react";

const cx = classNames.bind(styles);

function Filter({ handleFilter, setFilterLs }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

    return (
        <Popover
            trigger="click"
            placement="rightBottom"
            open={open}
            onOpenChange={() => {
                setOpen(!open);
            }}
            content={
                <>
                    <p className={cx("title")}>Filter by</p>
                    <span className={cx("sub-title")}>Status</span>
                    <select
                        className={cx("select")}
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                        }}
                    >
                        <option value={""}>...</option>
                        <option value={"status_active"}>Active</option>
                        <option value={"status_inactive"}>Inactive</option>
                    </select>
                    <p className={cx("title")}>Sort by</p>
                    <select
                        className={cx("select")}
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                        }}
                    >
                        <option>...</option>
                        <option value={"name_asc"}>Name Ascending</option>
                        <option value={"name_desc"}>Name Descending</option>
                        <option value={"createdDate_asc"}>Created Date Ascending</option>
                        <option value={"createdDate_desc"}>Created Date Descending</option>
                        <option value={"modifiedDate_desc"}>Modified Date Descending</option>
                        <option value={"modifiedDate_desc"}>Modified Date Descending</option>
                    </select>
                    <button
                        className={cx("submit-filter")}
                        onClick={() => {
                            if (status !== "" && sortBy !== "") {
                                setFilterLs([status, sortBy]);
                                handleFilter(status, sortBy);
                            } else if (status !== "") {
                                setFilterLs([status]);
                                handleFilter(status);
                            } else if (sortBy !== "") {
                                setFilterLs([sortBy]);
                                handleFilter(sortBy);
                            } else {
                                setFilterLs([]);
                                handleFilter();
                            }
                            setStatus("");
                            setSortBy("");
                            setOpen(!open);
                        }}
                    >
                        Filter
                    </button>
                </>
            }
        >
            <button
                className={cx("filter-btn")}
                onClick={() => setOpen(!open)}
            >
                <FilterListIcon />
                <span className={cx("title")}>Filter</span>
            </button>
        </Popover>
    );
}

export default Filter;