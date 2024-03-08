import styles from "./ProgramList.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useState } from "react";
import { SortIcon } from "../../../Components/Common/Icons/ActionIcons";
import Table from "../Table";
import { Pagination } from "antd";

const cx = classNames.bind(styles);

function ProgramList({ domChange, domChangeSuccess, reload }) {
  const programList = useSelector((state) => state.program.programList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [sortedInfo, setSortedInfo] = useState(null);

  const sortedColumn = (column) => {
    let order = "asc";
    if (
      sortedInfo &&
      sortedInfo.column === column &&
      sortedInfo.order === "asc"
    ) {
      order = "desc";
    }
    setSortedInfo({ column, order });
  };

  const sortedData = () => {
    if (!sortedInfo) {
      return programList;
    }

    const { column, order } = sortedInfo;
    return [...programList].sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const currentData = sortedData().slice(startIndex, endIndex);

  return (
    <>
      <table className={cx("table")}>
        <thead className={cx("thead")}>
          <tr className={cx("tr")}>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("id")}
              >
                ID <SortIcon />
              </button>
            </th>

            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("name")}
              >
                Program name <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("createOn")}
              >
                Create on <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("createBy")}
              >
                Create by <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("duration")}
              >
                Duration <SortIcon />
              </button>
            </th>
            <th className={cx("th", "id")}>
              <button
                className={cx("title")}
                onClick={() => sortedColumn("status")}
              >
                Status <SortIcon />
              </button>
            </th>
            <th className={cx("th")}></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <Table
              key={index}
              item={item}
              domChange={domChange}
              domChangeSuccess={domChangeSuccess}
              reload={reload}
            />
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
          total={programList.length}
        />
      </div>
    </>
  );
}
export default ProgramList;