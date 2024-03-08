import styles from "./ClassList.module.scss";
import classNames from "classnames/bind";
import { SortIcon } from "../../../Components/Common/Icons/ActionIcons";
import TableRow from "../TableRow";
import { Pagination } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function ClassList({ domChange, domChangeSuccess, reload }) {

    const classList = useSelector(state => state.class.classList);
    // console.log('Redux State:', useSelector(state => state)); // Log the entire Redux state
    // console.log('Class List:', classList);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [sortedInfo, setSortedInfo] = useState(null);

    const sortColumn = (column) => {
        let order = "asc";
        if (sortedInfo && sortedInfo.column === column && sortedInfo.order === "asc") {
            order = "desc";
        }
        setSortedInfo({ column, order });
    };


    const sortedData = () => {
        if (!sortedInfo) {
            return classList;
        }
        const { column, order } = sortedInfo;
        return [...classList].sort((a, b) => {
            if (a[column] < b[column]) {
                return order === "asc" ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return order === "asc" ? 1 : -1;
            }
            return 0;
        });
    };

    const currentData = sortedData().slice(startIndex, endIndex);

    return (
        <>
            <table className={cx("table")}>
                <thead className={cx("thead")}>
                    <tr className={cx("tr")}>
                        <th className={cx("th", "name")}><button className={cx("title")} onClick={() => { sortColumn("classNames") }}>Class <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("classCode") }}>Class Code <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("createdOn") }}>Created On <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("createdBy") }}>Created By<SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("duration") }}>Duration <SortIcon /></button></th>
                        <th className={cx("th", "attendee")}><button className={cx("title")} onClick={() => { sortColumn("attendee") }}>Attendee <SortIcon /></button></th>
                        {/* <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("status") }}>Status <SortIcon /></button></th> */}
                        <th className={cx("th", "location")}><button className={cx("title")} onClick={() => { sortColumn("location") }}>Location <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("fsu") }}>FSU <SortIcon /></button></th>
                        <th className={cx("th")}></th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <TableRow
                            key={index}
                            item={item}
                            domChange={domChange}
                            domChangeSuccess={domChangeSuccess}
                            reload={reload}
                        />
                    ))}
                </tbody>
            </table>
            <div className={cx("pagination")}>
                <Pagination
                    onChange={(page, pageSize) => {
                        setItemsPerPage(pageSize)
                        setCurrentPage(page);
                    }}
                    showSizeChanger
                    onShowSizeChange={(pageSize) => { setItemsPerPage(pageSize) }}
                    current={currentPage}
                    total={classList.length}
                    showTotal={(total) => <p className={cx("total")}>Total: {total} Classes</p>}
                />
            </div>
        </>
    )
}

export default ClassList;