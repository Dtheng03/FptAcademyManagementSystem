import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUsersList } from "../../Redux/Reducer/UsersSlice";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import Table from "./Table";
import SearchResult from "./SearchResult";
import axios from "axios";
import crypto from "crypto-js";

const cx = classNames.bind(styles);

function UserListPage() {
    const dispatch = useDispatch();

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

    const [searchValue, setSearchValue] = useState("");
    const [searchList, setSearchList] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDomChange, setIsDomChange] = useState(false);

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
                setData(response.data.data);
                dispatch(setUsersList(response.data.data));
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, [isDomChange]);

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
            {searchValue === "" ?
                <Table
                    openEdit={() => { setShowEditModal(true) }}
                    domChange={() => { setIsDomChange(true) }}
                    domChangeSuccess={() => setIsDomChange(false)}
                    refresh={() => {
                        setSearchList([]);
                        setSearchValue("");
                    }}
                />
                :
                <SearchResult
                    searchList={searchList}
                    openEdit={() => { setShowEditModal(true) }}
                    domChange={() => { setIsDomChange(true) }}
                    domChangeSuccess={() => setIsDomChange(false)}
                    refresh={() => {
                        setSearchList([]);
                        setSearchValue("");
                    }}
                />
            }

            {/* modal add new user */}
            {showAddModal &&
                <ModalAddUser
                    closeModal={() => { setShowAddModal(false) }}
                    domChange={() => { setIsDomChange(true) }}
                    domChangeSuccess={() => setIsDomChange(false)}
                    refresh={() => {
                        setSearchList([]);
                        setSearchValue("");
                    }}
                />
            }

            {/* modal edit user */}
            {showEditModal &&
                <ModalEditUser
                    closeModal={() => { setShowEditModal(false) }}
                    domChange={() => { setIsDomChange(true) }}
                    domChangeSuccess={() => setIsDomChange(false)}
                    refresh={() => {
                        setSearchList([]);
                        setSearchValue("");
                    }}
                />
            }
        </div >
    );
}

export default UserListPage;