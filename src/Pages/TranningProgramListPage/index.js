import React, { useEffect, useState } from "react";
import SearchWithIcon from "../../Components/Common/InputBox/SearchWithIcon/SearchWithIcon";
import Button from "../../Components/Common/Button";
import {
  AddIcon,
  FilterListIcon,
  SortIcon,
} from "../../Components/Common/Icons/ActionIcons";
import classNames from "classnames/bind";
import { UploadIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination } from "antd/es";

import styles from "./TranningProgram.scss";
import axios from "axios";

const cx = classNames.bind(styles);

export default function TranningListPage() {
  const [program, setProgram] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = program.slice(startIndex, endIndex);

  useEffect(() => {
    axios
      .get("https://65411666f0b8287df1fdc4fa.mockapi.io/program")
      .then((response) => {
        const trainningProgram = response.data;
        setProgram(trainningProgram);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array to run effect only once
  

  return (
    <div className={cx("container")}>
      <h3>Tranning Program</h3>
      <div className={cx("action")}>
        <div className={cx("search")}>
          <SearchWithIcon />
          <Button title={"Filter"} firstIcon={<FilterListIcon />} />
        </div>

        <div style={{ display: "flex" }}>
          <div className={cx("import")}>
            <Button title={"Import"} firstIcon={<UploadIcon />} />
          </div>

          <div className={cx("add-new")}>
            <Button title={"Add New"} firstIcon={<AddIcon />} />
          </div>
        </div>
      </div>

      <table className={cx("table")}>
        <thead className={cx("thead")}>
          <tr className={cx("tr")}>
            <th className={cx("th")}>
              <button className="title">
                ID
                <SortIcon />
              </button>
            </th>
            <th className={cx("th")}>
              <button className="title">
                Program Name <SortIcon />
              </button>
            </th>
            <th className={cx("th")}>
              <button className="title">
                Create on <SortIcon />
              </button>
            </th>
            <th className={cx("th")}>
              <button className="title">
                Create by <SortIcon />
              </button>
            </th>
            <th className={cx("th")}>
              <button className="title">
                Duration <SortIcon />
              </button>
            </th>
            <th className={cx("th")}>
              <button className="title">
                Status <SortIcon />
              </button>
            </th>
            <th className={cx("th")}></th>
          </tr>
        </thead>
        <tbody>
          {program.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.programName}</td>
              <td>{program.createOn}</td>
              <td>{program.createBy}</td>
              <td>{program.duration}</td>
              <td>{program.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          total={program.length}
        />
      </div>
    </div>
  );
}
