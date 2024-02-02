import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon, MoreIcon } from "../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon } from "../../Components/Common/Icons/OtherIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import StatusChip from "../../Components/Common/Status/StatusChip";
import { Pagination, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function UserListPage() {
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

    // ham xu ly khi nhap input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const filteredSuggestions = data.filter(
            suggestion => suggestion.name.toLowerCase().includes(value.toLowerCase())
                || suggestion.email.toLowerCase().includes(value.toLowerCase())
                || suggestion.id === value
        );
        setSuggestions(filteredSuggestions)
    };

    // ham xy ly khi search
    const handleSearch = () => {
        const f1 = filterLs[0];
        const f2 = filterLs[1];
        const f3 = filterLs[2];
        const f4 = filterLs[3];
        const newData = data.filter(x => x.name.includes(f1) || x.name.includes(f2) || x.name.includes(f3) || x.name.includes(f4)
            || x.email.includes(f1) || x.email.includes(f2) || x.email.includes(f3) || x.email.includes(f4)
            || x.id.includes(f1) || x.id.includes(f2) || x.id.includes(f3) || x.name.includes(f4));
        setResult(newData);
    };

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get("https://65bc5f2952189914b5bdcf3a.mockapi.io/Users");
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
        handleSearch();
    }, [filterLs])

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
                    <Button title={"Filter"} firstIcon={<FilterListIcon />} />
                </div>
                <Button title={"Add User"} firstIcon={<AddIcon />} />
            </div>

            {/* phan hien thi suggestion khi search */}
            {suggestions.length > 0 && searchValue !== "" && <div className={cx("suggestion")}>
                {suggestions.map(((item, index) => (
                    <div key={index}>
                        <div
                            className={cx("item")}
                            onClick={() => {
                                if (filterLs.indexOf(item.name) < 0) {
                                    setFilterLs([...filterLs, item.name]);
                                    setSearchValue("");
                                }
                            }}
                        >
                            {item.name}
                        </div>
                        <div
                            className={cx("item")}
                            onClick={() => {
                                if (filterLs.indexOf(item.email) < 0) {
                                    setFilterLs([...filterLs, item.email]);
                                    setSearchValue("");
                                }
                            }}
                        >
                            {item.email}
                        </div>
                    </div>
                )))
                }
            </div>}

            {/* phan hien thi gia tri search da chon */}
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
                            if (filterLs.length == 0) {
                                setResult([])
                            }
                        }}
                    >
                        {item}
                    </Tag>
                )))}
            </div>

            {/* phan hien thi thong tin */}
            <table className={cx("table")}>
                <thead className={cx("thead")}>
                    <tr className={cx("tr")}>
                        <th className={cx("th")}><button className={cx("title")}>ID <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Full name <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Email <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Date of birth <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Gender <SortIcon /></button></th>
                        <th className={cx("th")}><button className={cx("title")}>Type <SortIcon /></button></th>
                        <th className={cx("th")}></th>
                    </tr>
                </thead>
                {result.length > 0 ?
                    <tbody className={cx("tbody")}>
                        {result.map(item => (
                            <tr className={cx("tr")} key={item.id}>
                                <td className={cx("td", "id")}>{item.id}</td>
                                <td className={cx("td", "name")}>{item.name}</td>
                                <td className={cx("td")}>{item.email}</td>
                                <td className={cx("td")}>{item.dob}</td>
                                <td className={cx("td")}>{item.gender ? <MaleIcon /> : <FemaleIcon />}</td>
                                <td className={cx("td")}><StatusChip title={item.role ? "Admin" : "Trainer"} /></td>
                                <td className={cx("td")}><MoreIcon /></td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody className={cx("tbody")}>
                        {currentPageData.map(item => (
                            <tr className={cx("tr")} key={item.id}>
                                <td className={cx("td", "id")}>{item.id}</td>
                                <td className={cx("td", "name")}>{item.name}</td>
                                <td className={cx("td")}>{item.email}</td>
                                <td className={cx("td")}>{item.dob}</td>
                                <td className={cx("td")}>{item.gender ? <MaleIcon /> : <FemaleIcon />}</td>
                                <td className={cx("td")}><StatusChip title={item.role ? "Admin" : "Trainer"} /></td>
                                <td className={cx("td")}><MoreIcon /></td>
                            </tr>
                        ))}
                    </tbody>}
            </table>

            {/* phan chuyen trang */}
            {result.length == 0 && <div className={cx("pagination")}>
                <Pagination
                    onChange={(page, pageSize) => {
                        setItemsPerPage(pageSize)
                        setCurrentPage(page);
                    }}
                    showSizeChanger
                    onShowSizeChange={(pageSize) => { setItemsPerPage(pageSize) }}
                    defaultCurrent={1}
                    total={data.length}
                />
            </div>}
        </div>
    );
}

export default UserListPage;