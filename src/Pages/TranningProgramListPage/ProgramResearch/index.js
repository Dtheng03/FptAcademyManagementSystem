import styles from "./ProgramResearch.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { SortIcon } from "../../../Components/Common/Icons/ActionIcons";
import Table from "../Table";
import { Pagination } from "antd";

const cx = classNames.bind(styles);
function Research({ search, domChange, domChangeSuccess, reload }) {
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

  const sortedData = (search) => {
    if (!sortedInfo) {
      return search;
    }

    const { column, order } = sortedInfo;
    return [...search].sort((a, b) => {
      if (a[column] < b[column]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  const currentData = sortedData(search).slice(startIndex, endIndex);

  return (
    <>
      {search.length > 0 ? (
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

                <th className={cx("th", "name")}>
                  <button
                    className={cx("title")}
                    onClick={() => sortedColumn("tpName")}
                  >
                    Program name <SortIcon />
                  </button>
                </th>
                <th className={cx("th", "id")}>
                  <button
                    className={cx("title")}
                    onClick={() => sortedColumn("createdDate")}
                  >
                    Create on <SortIcon />
                  </button>
                </th>
                <th className={cx("th", "id")}>
                  <button
                    className={cx("title")}
                    onClick={() => sortedColumn("createdBy")}
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
              total={search.length}
              showTotal={(total) => <p className={cx("total")}>Total: {total} program</p>}
            />
          </div>
        </>
      ) : (
        <p  className={cx("no-data")}>No Data</p>
      )}
    </>
  );
}

export default Research;
