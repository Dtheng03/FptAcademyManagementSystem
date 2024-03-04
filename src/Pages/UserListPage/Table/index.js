import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { SortIcon } from "../../../Components/Common/Icons/ActionIcons";
import TableRow from "../TableRow";
import { Pagination } from "antd";
import crypto from "crypto-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Table({ openEdit, domChange, domChangeSuccess, refresh }) {
    // Decode roleName đã mã hóa
    var decryptedRoleName;
    const encryptedRoleName = sessionStorage.getItem("roleName");
    if (encryptedRoleName) {
        decryptedRoleName = crypto.AES.decrypt(
            encryptedRoleName,
            "react02"
        ).toString(crypto.enc.Utf8);
    }
    const roleName = decryptedRoleName;

    const usersList = useSelector(state => state.users.usersList);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // state config sort
    const [sortConfig, setSortConfig] = useState(null);

    // ham yeu cau sort
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // ham sort data
    const sortedData = () => {
        if (!sortConfig) {
            return usersList;
        }

        const { key, direction } = sortConfig;
        return [...usersList].sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return direction === 'asc' ? 1 : -1;
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
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("fullName") }}>Full name <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("email") }}>Email <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("dob") }}>Date of birth <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("gender") }}>Gender <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("roleName") }}>Type <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")} onClick={() => { requestSort("status") }}>Status <SortIcon /></button></th>
                        {roleName === "Super Admin" && <th className={cx("th")}></th>}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <TableRow
                            key={index}
                            item={item}
                            openEdit={openEdit}
                            domChange={domChange}
                            domChangeSuccess={domChangeSuccess}
                            refresh={refresh}
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
                    total={usersList.length}
                />
            </div>
        </>
    );
}

export default Table;