import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersList } from "../../Redux/Reducer/UsersSlice";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import Table from "./Table";
import SearchResult from "./SearchResult";
import axios from "axios";
import crypto from "crypto-js";
import { notification } from "antd";

const cx = classNames.bind(styles);

function UserListPage() {
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.users.usersList);

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

    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    // ham xu ly khi nhap input search
    const handleInputSearch = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value === "") {
            setSearchList([]);
        } else if (e.target.value !== "") {
            const searchList = usersList.filter(
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

    async function fetchUsers() {
        setIsLoading(true);
        try {
            const response = await axios.get("http://fams-group1-net03.ptbiology.com/api/user/view-user-list");
            // console.log(response);
            dispatch(setUsersList(response.data.data));
            setIsLoading(false);
        } catch (error) {
            // console.log(error);
            notification.error({
                message: error.message,
            });
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            {!isLoading ?
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
                    {searchValue === "" ?
                        <Table
                            openEdit={() => { setShowEditModal(true) }}
                            loading={(value) => { setIsLoading(value) }}
                            fetchUsers={fetchUsers}
                        />
                        :
                        <SearchResult
                            setSearchValue={(value) => { setSearchValue(value) }}
                            searchList={searchList}
                            openEdit={() => { setShowEditModal(true) }}
                            loading={(value) => { setIsLoading(value) }}
                            fetchUsers={fetchUsers}
                        />
                    }

                    {/* modal add new user */}
                    {showAddModal &&
                        <ModalAddUser
                            closeModal={() => { setShowAddModal(false) }}
                            loading={(value) => { setIsLoading(value) }}
                            fetchUsers={fetchUsers}
                        />
                    }

                    {/* modal edit user */}
                    {showEditModal &&
                        <ModalEditUser
                            closeModal={() => { setShowEditModal(false) }}
                            loading={(value) => { setIsLoading(value) }}
                            fetchUsers={fetchUsers}
                        />
                    }
                </div >
                :
                <div className={cx("modal")}>
                    <div className={cx("loading")}></div>
                </div>
            }
        </>
    )
}

export default UserListPage;