import styles from "./ClassListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination, Popover, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import FilterPopip from "../../Components/Common/FilterPopip/FilterPopip"

const cx = classNames.bind(styles);

function ClassListPage() {

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);

    const handleSort = (column) => {
        let sortedData = [...data];

        if (column === sortedColumn) {
            // Đảo ngược thứ tự sắp xếp nếu cùng cột đã được chọn trước đó
            sortedData.reverse();
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Sắp xếp theo cột mới
            sortedData.sort((a, b) => {
                if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
                if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            setSortOrder('asc');
            setSortedColumn(column);
        }

        setData(sortedData);
    };


    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filterLs, setFilterLs] = useState([]);
    const [result, setResult] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDomChange, setIsDomChange] = useState(false);

    //Xử lý input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const filteredSuggestions = data.filter(
            suggestion => suggestion.classNames.toLowerCase().startsWith(value.toLowerCase())
                || suggestion.classCode.toLowerCase().startsWith(value.toLowerCase())
                || suggestion.id === value
        );
        setSuggestions(filteredSuggestions)
    };

    //Xử lý sau khi search
    const handleSearch = () => {
        const f1 = filterLs[0];
        const f2 = filterLs[1];
        const f3 = filterLs[2];
        const f4 = filterLs[3];
        const newData = data.filter(x => x.classNames.includes(f1) || x.classNames.includes(f2) || x.classNames.includes(f3) || x.classNames.includes(f4)
            || x.classCode.includes(f1) || x.classCode.includes(f2) || x.classCode.includes(f3) || x.classCode.includes(f4)
            || x.createdBy.includes(f1) || x.createdBy.includes(f2) || x.createdBy.includes(f3) || x.createdBy.includes(f4));
        setResult(newData);
    };

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
        handleSearch();
    }, [filterLs, showAddModal, showEditModal, isDomChange])

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
                            disabled={filterLs.length >= 4 ? true : false}
                            value={searchValue}
                            onChange={handleInputSearch}
                            placeholder="Search by..."
                        />
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
                <Button
                    title={"Add Class"}
                    firstIcon={<AddIcon />}
                />
            </div>


            {suggestions.length > 0 && searchValue !== "" && <div className={cx("suggestion")}>
                {suggestions.map(((item, index) => (
                    <div key={index}>
                        <div
                            className={cx("item")}
                            onClick={() => {
                                if (filterLs.indexOf(item.classNames) < 0) {
                                    setFilterLs([...filterLs, item.classNames]);
                                    setSearchValue("");
                                }
                            }}
                        >
                            {item.classNames}
                        </div>
                        <div
                            className={cx("item")}
                            onClick={() => {
                                if (filterLs.indexOf(item.classCode) < 0) {
                                    setFilterLs([...filterLs, item.classCode]);
                                    setSearchValue("");
                                }
                            }}
                        >
                            {item.classCode}
                        </div>
                        <div
                            className={cx("item")}
                            onClick={() => {
                                if (filterLs.indexOf(item.createdBy) < 0) {
                                    setFilterLs([...filterLs, item.createdBy]);
                                    setSearchValue("");
                                }
                            }}
                        >
                            {item.createdBy}
                        </div>
                    </div>
                )))
                }
            </div>}


            <div className={cx("search-result")}>
                {filterLs.map(((item, index) => (
                    <Tag
                        key={index}
                        className={cx("result")}
                        color="#474747"
                        closable
                        onClose={() => {
                            const newLs = filterLs.filter(x => x !== item);
                            setFilterLs(newLs);
                            if (filterLs.length === 0) {
                                setResult([])
                            }
                        }}
                    >
                        {item}
                    </Tag>
                )))}
            </div>
            

            <table className={cx("table")}>
                <thead className={cx("thead")}>
                    <tr className={cx("tr")}>
                        {/* <th className={cx("th")}><button className={cx("title")}>ID <SortIcon /></button></th> */}
                        <th className={cx('th', 'name')}>
                            <button className={cx('title')} onClick={() => handleSort('classNames')}>
                                Class <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('classCode')}>
                                Class Code <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('createdOn')}>
                                Created On <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('createdBy')}>
                                Created By <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('duration')}>
                                Duration <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('attendee')}>
                                Attendee <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('location')}>
                                Location <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}>
                            <button className={cx('title')} onClick={() => handleSort('fsu')}>
                                FSU <SortIcon />
                            </button>
                        </th>
                        <th className={cx('th')}></th>
                    </tr>
                </thead>
                {result.length > 0 ?
                    <tbody className={cx("tbody")}>
                        {result.map(item => (
                            <TableRow
                                key={item.id}
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

            {
                result.length === 0 && <div className={cx("pagination")}>
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
        </div >
    );
}

export default ClassListPage;