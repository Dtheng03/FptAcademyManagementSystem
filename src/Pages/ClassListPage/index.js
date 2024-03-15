import styles from "./ClassListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";
import ClassList from "./ClassList";
import { Popover, Spin, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { setClassList } from "../../Redux/Reducer/ClassSlice";
import Filter from "./Filter";
import crypto from "crypto-js";
import axiosClient from "../../Services/axios/config";

const cx = classNames.bind(styles);

function ClassListPage() {
    const dispatch = useDispatch();
    const classList = useSelector(state => state.class.classList);

    var decryptedRoleName;
    const encryptedRoleName = sessionStorage.getItem("roleName");
    if (encryptedRoleName) {
        decryptedRoleName = crypto.AES.decrypt(
            encryptedRoleName,
            "react02"
        ).toString(crypto.enc.Utf8);
    }
    const roleName = decryptedRoleName;

    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState([]);

    const [isDomChange, setIsDomChange] = useState(false);

    // const handleClearFilters = () => {};

    //Xử lý input search
    const handleInputSearch = (e) => {
        const value = e.target.value
        setSearchValue(value);
        if (value === "") {
            setSearch([]);
        } else if (value !== "") {
            const searchResults = classList.filter(
                result => result.className.toLowerCase().includes(value.toLowerCase())
                    || result.classCode.toLowerCase().includes(value.toLowerCase())
            );
            if (searchResults.length > 0) {
                setSearch(searchResults);
            } else {
                setSearch([]);
            }
        }
    };

    //Gọi API
    async function getClass() {
        setLoading(true);
        try {
            const response = await axiosClient.get("/api/class/view-class-list");
            dispatch(setClassList(response.data.data));
            setLoading(false);
            console.log(response);
        } catch (error) {
            notification.error({
                message: error.message,
                duration: '1.5'
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        getClass();
    }, [isDomChange])

    return (
        <div className={cx("container")}>
            <Spin
                indicator={<LoadingOutlined style={{ color: "#2D3748" }} />}
                spinning={loading}
                size="large"
                style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <h3 className={cx("header")}>Training Class</h3>
                <div className={cx("action")}>
                    <div className={cx("search")}>
                        <div className={cx('search-input')}>
                            <SearchIcon />
                            <input
                                className={cx('input-contain')}
                                type="text"
                                value={searchValue}
                                onChange={handleInputSearch}
                                placeholder="Search..."
                            />
                            {searchValue !== "" &&
                                <button
                                    className={cx("clear-search-btn")}
                                    onClick={() => {
                                        setSearch([]);
                                        setSearchValue("");
                                    }}
                                >
                                    <CancleIcon />
                                </button>
                            }
                        </div>
                        <Popover
                            trigger="click"
                            placement="bottomRight"
                            content={<Filter
                            // onSubmit={""}
                            // onClear={handleClearFilters}
                            />}
                        >
                            <>
                                <Button
                                    title="Filter"
                                    firstIcon={<FilterListIcon />}
                                />
                            </>
                        </Popover>
                    </div>

                    <Link to="/create-class">
                        {(roleName === "Super Admin" || roleName === "Admin") &&
                            <Button
                                title={"Add Class"}
                                firstIcon={<AddIcon />}
                            />}
                    </Link>
                </div>

                {/* <div className={cx("filter-result")}></div> */}

                {searchValue === "" ?
                    <ClassList
                        domChange={() => { setIsDomChange(true) }}
                        domChangeSuccess={() => setIsDomChange(false)}
                        reload={() => {
                            setSearch([]);
                            setSearchValue("");
                        }}
                    />
                    :
                    <Search
                        search={search}
                        domChange={() => { setIsDomChange(true) }}
                        domChangeSuccess={() => setIsDomChange(false)}
                        reload={() => {
                            setSearch([]);
                            setSearchValue("");
                        }}
                    />
                }
            </Spin>
        </div>
    );
}

export default ClassListPage;
