import { useState } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { SortIcon } from "../../../Components/Common/Icons/ActionIcons";
import TableRow from "../TableRow";
import { Pagination } from "antd";
import crypto from "crypto-js";

const cx = classNames.bind(styles);

function Search({ search, domChange, domChangeSuccess, reload }) {

    var decryptedRoleName;
    const encryptedRoleName = sessionStorage.getItem("roleName");
    if (encryptedRoleName) {
        decryptedRoleName = crypto.AES.decrypt(
            encryptedRoleName,
            "react02"
        ).toString(crypto.enc.Utf8);
    }
    const roleName = decryptedRoleName;

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
    }

    const sortedData = (search) => {
        if (!sortedInfo) {
            return search;
        }
        const { column, order } = sortedInfo;
        return [...search].sort((a, b) => {
            if (column === "createdBy") {
                const fullNameA = a.createdBy ? a.createdBy.fullName : "";
                const fullNameB = b.createdBy ? b.createdBy.fullName : "";

                if (fullNameA < fullNameB) {
                    return order === "asc" ? -1 : 1;
                }
                if (fullNameA > fullNameB) {
                    return order === "asc" ? 1 : -1;
                }
                return 0;
            }
            else {
                if (a[column] < b[column]) {
                    return order === "asc" ? -1 : 1;
                }
                if (a[column] > b[column]) {
                    return order === "asc" ? 1 : -1;
                }
                return 0;
            }
        });
    }

    const currentData = sortedData(search).slice(startIndex, endIndex);

    return (
        <>
            {search.length > 0 ?
                <>
                    <table className={cx("table")}>
                        <thead className={cx("thead")}>
                            <tr className={cx("tr")}>
                                <th className={cx("th", "name")}><button className={cx("title")} onClick={() => { sortColumn("className") }}>Class <SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("classCode") }}>Class Code <SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("createdOn") }}>Created On <SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("createdBy") }}>Created By<SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("duration") }}>Duration <SortIcon /></button></th>
                                {/* <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("attendee") }}>Attendee <SortIcon /></button></th> */}
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("status") }}>Status <SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("location") }}>Location <SortIcon /></button></th>
                                <th className={cx("th")}><button className={cx("title")} onClick={() => { sortColumn("fsu") }}>FSU <SortIcon /></button></th>
                                {(roleName === "Super Admin" || roleName === "Admin") &&
                                    <th className={cx("th")}></th>}
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
                            total={search.length}
                            showTotal={(total) => <p className={cx("total")}>Total: {total} Classes</p>}
                        />
                    </div>
                </>
                :
                <p className={cx("null-result")}>
                    Search results are not accurate!
                </p>
            }
        </>
    );
}

export default Search;