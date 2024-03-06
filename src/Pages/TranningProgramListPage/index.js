import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TranningProgram.module.scss";
import classNames from "classnames/bind";
import {
  SearchIcon,
  UploadIcon,
} from "../../Components/Common/Icons/DocManageIcons";
import Button from "../../Components/Common/Button";
import { Link } from "react-router-dom";
import {
  AddIcon,
  CancleIcon,
  FilterListIcon,
  SortIcon,
} from "../../Components/Common/Icons/ActionIcons";
import { Pagination, Tag, Spin } from "antd";
import Table from "./Table";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setProgramList } from "../../Redux/Reducer/ProgramTranningSlice";
import ProgramList from "./ProgramList";
import Research from "./ProgramResearch";
const cx = classNames.bind(styles);
export default function TranningProgramListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState([]);

  const [isDomChange, setIsDomChange] = useState(false);

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearch([]);
    } else if (value !== "") {
      const searchResults = data.filter((result) =>
        result.name.toLowerCase().includes(value.toLowerCase())
      );
      if (searchResults.length > 0) {
        setSearch(searchResults);
      } else {
        setSearch([]);
      }
    }
  };

  useEffect(() => {
    async function getProgram() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://65411666f0b8287df1fdc4fa.mockapi.io/program"
        );
        // const response = await axios.get(
        //   "http://fams-group1-net03.ptbiology.com//api/trainingprogram/view-training-program-list"
        // );
        setData(response.data);
        dispatch(setProgramList(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProgram();
  }, [isDomChange]);

  return (
    <div className={cx("container")}>
      <Spin
        indicator={<LoadingOutlined style={{ color: "#2D3748" }} />}
        spinning={loading}
        size="default"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%",
        }}
      >
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
              {searchValue !== "" &&
              <button className={cx("clear-search-btn")}
              onClick={() =>{
                setSearch([]);
                setSearchValue("");
              }

              }>
              <CancleIcon/>
              </button>
              }
            </div>
            <Button title="Filter" firstIcon={<FilterListIcon />} />
          </div>
          <div className={cx("btn-grp")}>
            <button className={cx("import-btn")}>
              <UploadIcon style={{ marginRight: "13px" }} />
              Import
            </button>
            <Link to="/create-program">
              <Button title="Add New" firstIcon={<AddIcon />} />
            </Link>
          </div>
        </div>

        <div className={cx("search-result")}>
          <Tag className={cx("result")} color="#474747" closable>
            cc
          </Tag>
        </div>

        {searchValue === "" ? (
          <ProgramList
            domChange={() => {
              setIsDomChange(true);
            }}
            domChangeSuccess={() => setIsDomChange(false)}
            reload={() => {
              setSearch([]);
              setSearchValue("");
            }}
          />
        ) : (
          <Research
            search={search}
            domChange={() => {
              setIsDomChange(true);
            }}
            domChangeSuccess={() => setIsDomChange(false)}
            reload={() => {
              setSearch([]);
              setSearchValue("");
            }}
          />
        )}
      </Spin>
    </div>
  );
}
