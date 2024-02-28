import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TranningProgram.module.scss";
import classNames from "classnames/bind";
import {
  SearchIcon,
  UploadIcon,
} from "../../Components/Common/Icons/DocManageIcons";
import Button from "../../Components/Common/Button";

import {
  AddIcon,
  FilterListIcon,
  SortIcon,
} from "../../Components/Common/Icons/ActionIcons";
import { Pagination, Tag } from "antd";
import Table from "./Table";

const cx = classNames.bind(styles);
export default function TranningProgramListPage() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const [sortedInfo, setSortedInfo] = useState({});

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState([]);

  const [result, setResult] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDomChange, setIsDomChange] = useState(false);

  const handleSort = (columnKey) => {
    let sortOrder =
      sortedInfo.columnKey === columnKey && sortedInfo.order === "ascend"
        ? "descend"
        : "ascend";
    setSortedInfo({ columnKey, order: sortOrder });
  };

  const sortedData = data.sort((a, b) => {
    const columnKey = sortedInfo.columnKey;
    const order = sortedInfo.order === "ascend" ? 1 : -1;

    if (columnKey === "name") {
      return a.name.localeCompare(b.name) * order;
    } else if (columnKey === "id") {
      return (a.id - b.id) * order;
    } else if (columnKey === "createOn") {
      return a.createOn.localeCompare(b.createOn) * order;
    } else if (columnKey === "createBy") {
      return a.createBy.localeCompare(b.createBy) * order;
    } else if (columnKey === "duration") {
      return (a.duration - b.duration) * order;
    } else if (columnKey === "status") {
      return a.status.localeCompare(b.status) * order;
    }

    return 0;
  });

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearch([]);
    } else {
      const searchResults = data.filter((result) =>
        result.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearch(searchResults);
    }
  };

  useEffect(() => {
    async function getProgram() {
      try {
        const response = await axios.get(
          "https://65411666f0b8287df1fdc4fa.mockapi.io/program"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProgram();
  }, [isDomChange]);

  return (
    <div className={cx("container")}>
      <h3 className={cx("header")}>Tranning program</h3>
      <div className={cx("action")}>
        <div className={cx("search")}>
          <div className={cx("search-input")}>
            <SearchIcon />
            <input
              className={cx("input-contain")}
              type="text"
              value={searchValue}
              onChange={handleInputSearch}
              placeholder="Search by..."
            />
          </div>
          <Button title="Filter" firstIcon={<FilterListIcon />} />
        </div>
        <div className={cx("btn-grp")}>
          <button className={cx("import-btn")}>
          <UploadIcon style={{ marginRight: '13px' }} /> 
            Import
          </button>
          <Button title="Add New" firstIcon={<AddIcon />} />
        </div>
      </div>

      <div className={cx("search-result")}>
        <Tag className={cx("result")} color="#474747" closable>
          cc
        </Tag>
      </div>

      <table className={cx("table")}>
        <thead className={cx("thead")}>
          <tr className={cx("tr")}>
            <th className={cx("th", "id")}>
              <button className={cx("title")} onClick={() => handleSort("id")}>
                ID <SortIcon />
              </button>
            </th>

            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => handleSort("name")}
              >
                Program name <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => handleSort("createOn")}
              >
                Create on <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => handleSort("createBy")}
              >
                Create by <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => handleSort("duration")}
              >
                Duration <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => handleSort("status")}
              >
                Status <SortIcon />
              </button>
            </th>
            <th className={cx("th")}></th>
          </tr>
        </thead>
        {search.length > 0 ? (
          <tbody className={cx("tbody")}>
            {search.map((item) => (
              <Table
                key={item.id}
                item={item}
                domChange={() => setIsDomChange(true)}
                domChangeSuccess={() => setIsDomChange(false)}
              />
            ))}
          </tbody>
        ) : (
          <tbody className={cx("tbody")}>
            {currentPageData.map((item) => (
              <Table
                key={item.id}
                item={item}
                domChange={() => setIsDomChange(true)}
                domChangeSuccess={() => setIsDomChange(false)}
              />
            ))}
          </tbody>
        )}
      </table>

      {(search.length > 0 || data.length > 0) && (
        <div className={cx("pagination")}>
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
        </div>
      )}
    </div>
  );
}
