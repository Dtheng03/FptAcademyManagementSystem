import styles from "./ClassListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterPopip from "../../Components/Common/FilterPopip/FilterPopip"
import { Link } from "react-router-dom";
import Search from "./Search";
import ClassList from "./ClassList";
import { Popover, Spin, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setClassList } from "../../Redux/Reducer/ClassSlice";
import Filter from "./Filter";

const cx = classNames.bind(styles);

function ClassListPage() {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState([]);

    const [isDomChange, setIsDomChange] = useState(false);

    //Xử lý input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === "") {
            setSearch([]);
        } else if (value.trim() !== "") {
            const searchResults = data.filter(
                result => result.classNames.toLowerCase().includes(value.toLowerCase())
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
            const response = await axios.get("https://653d1d13f52310ee6a99e3b7.mockapi.io/class");
            // const response = await axios.get("http://fams-group1-net03.ptbiology.com/api/class/view-class-list");
            // setData(response.data);
            dispatch(setClassList(response.data));
            setLoading(false);
        } catch (error) {
            notification.error({
                message: error.message,
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
                            content={<Filter />}
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
                        <Button
                            title={"Add Class"}
                            firstIcon={<AddIcon />}
                        />
                    </Link>
                </div>

                <div className={cx("filter-result")}>
                    nguyen
                </div>

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
