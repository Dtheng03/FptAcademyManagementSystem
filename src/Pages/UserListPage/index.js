import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, SortIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import Filter from "./Filter";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";

const cx = classNames.bind(styles);

function UserListPage() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const roleName = sessionStorage.getItem("roleName");

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [filterLs, setFilterLs] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDomChange, setIsDomChange] = useState(false);

    // ham xu ly khi nhap input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const searchList = data.filter(
            result => result.fullName.toLowerCase().includes(value.toLowerCase())
                || result.email.toLowerCase().includes(value.toLowerCase())
        );
        setSearchList(searchList);
    };

    // ham xu ly filter
    const handleFilter = (filter, sort) => {
        async function getUser() {
            try {
                const response = await axios.get(`http://fams-group1-net03.ptbiology.com/api/user/view-user-list?filter-by=${filter}&sort-by=${sort}`);
                setData(response.data.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
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
    }, [showAddModal, showEditModal, isDomChange])

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
                            disabled={filterLs.length >= 4 ? true : false}
                            value={searchValue}
                            onChange={handleInputSearch}
                            placeholder="Search by..."
                        />
                    </div>
                    <Filter handleFilter={handleFilter} setFilterLs={setFilterLs} />
                </div>
                {roleName !== "Trainer" && <Button
                    title={"Add User"}
                    firstIcon={<AddIcon />}
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                />}
            </div>

            {/* phan hien thi gia tri filter da chon */}
            <div className={cx("filter-result")}>
                {filterLs.map(((item, index) => (
                    <Tag
                        key={index}
                        className={cx("filter")}
                        color="#474747"
                    >
                        {item}
                    </Tag>
                )))}
                {filterLs.length > 0 &&
                    < button
                        className={cx("clear")}
                        onClick={() => {
                            setFilterLs([]);
                            handleFilter();
                        }}
                    >
                        <CancleIcon />
                    </button>}
            </div>

            {/* phan hien thi thong tin */}
            <table className={cx("table")}>
                <thead className={cx("thead")}>
                    <tr className={cx("tr")}>
                        <th className={cx("th")}><button className={cx("title")}>Full name <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Email <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Date of birth <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Gender <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Type <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Status <SortIcon /></button></th>
                        {roleName === "Super Admin" && <th className={cx("th")}></th>}
                    </tr>
                </thead>
                {searchList.length > 0 ?
                    <tbody className={cx("tbody")}>
                        {searchList.map((item, index) => (
                            <TableRow
                                key={index}
                                item={item}
                                openEdit={() => setShowEditModal(true)}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                            />
                        ))}
                    </tbody>
                    :
                    <tbody className={cx("tbody")}>
                        {currentPageData.map(item => (
                            <TableRow
                                key={item.id}
                                item={item}
                                openEdit={() => setShowEditModal(true)}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                            />
                        ))}
                    </tbody>}
            </table>

            {/* phan chuyen trang */}
            {
                (searchList.length > 0 || data.length > 0) && <div className={cx("pagination")}>
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
            {showAddModal && <ModalAddUser closeModal={() => { setShowAddModal(false) }} />}

            {/* modal edit user */}
            {showEditModal && <ModalEditUser closeModal={() => { setShowEditModal(false) }} />}
        </div >
    );
}

export default UserListPage;