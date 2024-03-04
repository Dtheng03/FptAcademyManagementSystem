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
import { Popover } from "antd";
import { useDispatch } from "react-redux";
import { setClassList } from "../../Redux/Reducer/ClassSlice";

const cx = classNames.bind(styles);

function ClassListPage() {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);


    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState([]);

    const [isDomChange, setIsDomChange] = useState(false);

    //Xử lý input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value === "") {
            setSearch([]);
        } else if (value !== "") {
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
    useEffect(() => {
        async function getClass() {
            try {
                const response = await axios.get("https://653d1d13f52310ee6a99e3b7.mockapi.io/class");
                setData(response.data);
                dispatch(setClassList(response.data));
            } catch (error) {
                console.error(error);
            }
        }
        getClass();
    }, [isDomChange])

    return (
        <div className={cx("container")}>
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
                        <button
                            className={cx("clear-search-btn")}
                            onClick={() => {
                                setSearch([]);
                                setSearchValue("");
                            }}
                        >
                            <CancleIcon />
                        </button>
                    </div>
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={<FilterPopip />}
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
        </div >
    );
}

export default ClassListPage;
