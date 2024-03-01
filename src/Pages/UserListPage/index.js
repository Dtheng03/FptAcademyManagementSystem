import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, SortIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination, Tag } from "antd";
import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import axios from "axios";
import crypto from "crypto-js";

const cx = classNames.bind(styles);

function UserListPage() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

    const [data, setData] = useState([]);

    const [sortConfig, setSortConfig] = useState(null);
    const sortedData = () => {
        if (!sortConfig) {
            return data;
        }

        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = sortedData().slice(startIndex, endIndex);

    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDomChange, setIsDomChange] = useState(false);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // ham xu ly khi nhap input search
    const handleInputSearch = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value === "") {
            setSearchList([]);
        } else if (e.target.value !== "") {
            const searchList = data.filter(
                result => result.fullName.toLowerCase().includes(e.target.value.toLowerCase())
                    || result.email.toLowerCase().includes(e.target.value.toLowerCase())
            );
            if (searchList.length > 0) {
                setSearchList(searchList);
            } else {
                setSearchList([]);
            }
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get("http://fams-group1-net03.ptbiology.com/api/user/view-user-list");
                setData(response.data.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, [showAddModal, showEditModal, isDomChange]);

    return (
        <div className={cx("container")}>
            <h4 className={cx("header")}>User Management</h4>

            {/* phan chuc nang */}
            <div className={cx("action")}>
                <div className={cx("search")}>
                    <div className={cx('search-input')}>
                        <SearchIcon />
                        <input
                            className={cx('input-contain')}
                            type="text"
                            value={searchValue}
                            onChange={handleInputSearch}
                            placeholder="Search by fullname, email"
                        />
                        {searchValue !== "" &&
                            <button
                                className={cx("clear-btn")}
                                onClick={() => {
                                    setSearchValue("");
                                    setSearchList([]);
                                }}
                            >
                                <CancleIcon />
                            </button>
                        }
                    </div>
                </div>
                {(roleName === "Super Admin" || roleName === "Admin") && <Button
                    title={"Add User"}
                    firstIcon={<AddIcon />}
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                />}
            </div>

            {/* phan hien thi thong tin */}
            {
                searchValue !== "" && searchList.length > 0 &&
                < table className={cx("table")}>
                    <thead className={cx("thead")}>
                        <tr className={cx("tr")}>
                            <th className={cx("th")}><button className={cx("title")}>Full name</button></th>
                            <th className={cx("th")}><button className={cx("title")}>Email</button></th>
                            <th className={cx("th")}><button className={cx("title")}>Date of birth</button></th>
                            <th className={cx("th")}><button className={cx("title")}>Gender</button></th>
                            <th className={cx("th")}><button className={cx("title")}>Type</button></th>
                            <th className={cx("th")}><button className={cx("title")}>Status</button></th>
                            {roleName === "Super Admin" && <th className={cx("th")}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {searchList.map((item, index) => (
                            <TableRow
                                key={index}
                                item={item}
                                openEdit={() => setShowEditModal(true)}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                                refresh={() => {
                                    setSearchList([]);
                                    setSearchValue("");
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            }
            {
                (searchValue === "" && searchList.length === 0) &&
                <table className={cx("table")}>
                    <thead className={cx("thead")}>
                        <tr className={cx("tr")}>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("fullName")}>Full name <SortIcon /></button></th>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("email")}>Email <SortIcon /></button></th>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("dob")}>Date of birth <SortIcon /></button></th>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("gender")}>Gender <SortIcon /></button></th>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("roleName")}>Type <SortIcon /></button></th>
                            <th className={cx("th")}><button className={cx("title")} onClick={() => requestSort("status")}>Status <SortIcon /></button></th>
                            {roleName === "Super Admin" && <th className={cx("th")}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <TableRow
                                key={index}
                                item={item}
                                openEdit={() => setShowEditModal(true)}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                                refresh={() => {
                                    setSearchList([]);
                                    setSearchValue("");
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            }
            {searchValue !== "" && searchList.length === 0 && <p className={cx("no-data")}>Oops! There are no matching data.</p>}

            {/* phan chuyen trang */}
            {
                searchValue !== "" || searchList.length === 0 && <div className={cx("pagination")}>
                    <Pagination
                        onChange={(page, pageSize) => {
                            setItemsPerPage(pageSize)
                            setCurrentPage(page);
                        }}
                        showSizeChanger
                        onShowSizeChange={(pageSize) => { setItemsPerPage(pageSize) }}
                        current={currentPage}
                        total={data.length}
                    />
                </div>
            }

            {/* modal add new user */}
            {showAddModal && <ModalAddUser closeModal={() => { setShowAddModal(false) }} domChange={() => {
                setSearchList([]);
                setSearchValue("");
            }} />}

            {/* modal edit user */}
            {showEditModal && <ModalEditUser closeModal={() => { setShowEditModal(false) }} domChange={() => {
                setSearchList([]);
                setSearchValue("");
            }} />}
        </div >
    );
}

export default UserListPage;