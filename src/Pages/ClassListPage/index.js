import styles from "./ClassListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination, Popover } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import FilterPopip from "../../Components/Common/FilterPopip/FilterPopip"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ClassListPage() {
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState([]);

    const [isDomChange, setIsDomChange] = useState(false);

    const [sortedInfo, setSortedInfo] = useState([]);

    //sắp xếp tăng giảm theo từng cột
    const handleSort = (columnKey) => {
        let sortOrder =
            sortedInfo.columnKey === columnKey && sortedInfo.order === 'ascend' ? 'descend' : 'ascend';
        setSortedInfo({ columnKey, order: sortOrder });
    };

    const sortedData = data.sort((a, b) => {
        const columnKey = sortedInfo.columnKey;
        const order = sortedInfo.order === 'ascend' ? 1 : -1;

        if (columnKey === 'classNames') {
            return a.classNames.localeCompare(b.classNames) * order;
        }
        else if (columnKey === 'classCode') {
            return a.classCode.localeCompare(b.classCode) * order;
        }
        else if (columnKey === 'createdOn') {
            return a.createdOn.localeCompare(b.createdOn) * order;
        }
        else if (columnKey === 'createdBy') {
            return a.createdBy.localeCompare(b.createdBy) * order;
        }
        else if (columnKey === 'duration') {
            return (a.duration - b.duration) * order;;
        }
        else if (columnKey === 'attendee') {
            return a.attendee.localeCompare(b.attendee) * order;
        }
        else if (columnKey === 'status') {
            return a.status.localeCompare(b.status) * order;
        }
        else if (columnKey === 'location') {
            return a.location.localeCompare(b.location) * order;
        }
        else if (columnKey === 'fsu') {
            return a.fsu.localeCompare(b.fsu) * order;
        }

        return 0;
    });

    //Xử lý input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === "") {
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
                setData(response.data)
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
                            X
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

            </div>

            {searchValue !== "" && search.length > 0 &&
                <table className={cx("table")}>
                    <thead className={cx("thead")}>
                        <tr className={cx("tr")}>
                            {/* <th className={cx("th")}><button className={cx("title")}>ID <SortIcon /></button></th> */}
                            <th className={cx('th', 'name')}>
                                <button className={cx('title')} onClick={() => handleSort('classNames')}>Class <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('classCode')}>Class Code <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('createdOn')}>Created On</button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('createdBy')}>Created By <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('duration')}>Duration <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('attendee')}>Attendee <SortIcon /></button>
                            </th>
                            {/* <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('status')}>Status <SortIcon /></button>
                            </th> */}
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('location')}>Location <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('fsu')}>FSU <SortIcon /></button>
                            </th>
                            <th className={cx('th')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx("tbody")}>
                        {search.map((item, index) => (
                            <TableRow
                                key={index}
                                item={item}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                                reloading={() => {
                                    setSearch([]);
                                    setSearchValue("");
                                }}
                            />
                        ))}
                    </tbody>
                </table>}

            {(searchValue === "" && search.length === 0) &&
                <table className={cx("table")}>
                    <thead className={cx("thead")}>
                        <tr className={cx("tr")}>
                            {/* <th className={cx("th")}><button className={cx("title")}>ID <SortIcon /></button></th> */}
                            <th className={cx('th', 'name')}>
                                <button className={cx('title')} onClick={() => handleSort('classNames')}>Class <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('classCode')}>Class Code <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('createdOn')}>Created On</button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('createdBy')}>Created By <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('duration')}>Duration <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('attendee')}>Attendee <SortIcon /></button>
                            </th>
                            {/* <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('status')}>Status <SortIcon /></button>
                            </th> */}
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('location')}>Location <SortIcon /></button>
                            </th>
                            <th className={cx('th')}>
                                <button className={cx('title')} onClick={() => handleSort('fsu')}>FSU <SortIcon /></button>
                            </th>
                            <th className={cx('th')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx("tbody")}>
                        {currentPageData.map((item, index) => (
                            <TableRow
                                key={index}
                                item={item}
                                domChange={() => setIsDomChange(true)}
                                domChangeSuccess={() => setIsDomChange(false)}
                                reloading={() => {
                                    setSearch([]);
                                    setSearchValue("");
                                }}
                            />
                        ))}
                    </tbody>
                </table>}

            {
                searchValue !== "" && search.length === 0 &&
                <p className={cx("null-result")}>
                    Search results are not accurate!
                </p>
            }

            {(searchValue !== "") || (search.length === 0 && <div className={cx("pagination")}>
                <Pagination
                    onChange={(page, pageSize) => {
                        setItemsPerPage(pageSize);
                        setCurrentPage(page);
                    }}
                    showSizeChanger
                    onShowSizeChange={(pageSize) => {
                        setItemsPerPage(pageSize);
                    }}
                    current={currentPage}
                    total={data.length}
                />
            </div>)}
        </div >
    );
}

export default ClassListPage;
