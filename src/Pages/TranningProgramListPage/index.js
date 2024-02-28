import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TranningProgram.module.scss";
import classNames from "classnames/bind";
import { SearchIcon, UploadIcon } from "../../Components/Common/Icons/DocManageIcons";
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
  console.log(currentPage);

  const [result, setResult] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDomChange, setIsDomChange] = useState(false);

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
              placeholder="search by..."
            />
          </div>
          <Button title="Filter" firstIcon={<FilterListIcon />} />
        </div>
        
        <Button title="Add New" firstIcon={<AddIcon />} />
        
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
              <button className={cx("title")}>
                ID <SortIcon />
              </button>
            </th>

            <th className={cx("th", "id")}>
              <button className={cx("title")}>
                Program name <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button className={cx("title")}>
                Create on <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button className={cx("title")}>
                Create by <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button className={cx("title")}>
                Duration <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button className={cx("title")}>
                Status <SortIcon />
              </button>
            </th>
            <th className={cx("th")}></th>
          </tr>
        </thead>
        {result.length > 0 ? (
          <tbody className={cx("tbody")}>
            {result.map((item) => (
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

      {result.length === 0 && (
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
