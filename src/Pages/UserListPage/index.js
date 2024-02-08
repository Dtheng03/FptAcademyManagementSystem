import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon, CancleIcon } from "../../Components/Common/Icons/ActionIcons";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons";
import { Pagination, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TableRow from "./TableRow";

const cx = classNames.bind(styles);

const schema = yup
    .object({
        role: yup.number().moreThan(0, "This field is required"),
        name: yup.string().required("This field is required").trim(),
        email: yup.string().required("This field is required").email("This field must be a valid email").trim(),
        phone: yup.string().required("This field is required").length(10, "Phone number must have 10 digits").trim(),
        dob: yup.string().required("This field is required"),
    })
    .required()

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

    const [showAddModal, setShowAddModal] = useState(false);
    const [gender, setGender] = useState(true);
    const [status, setStatus] = useState(true);

    // ham xu ly khi nhap input search
    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const filteredSuggestions = data.filter(
            suggestion => suggestion.name.toLowerCase().startsWith(value.toLowerCase())
                || suggestion.email.toLowerCase().startsWith(value.toLowerCase())
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

    // ham handle form add
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data, event) => {
        event.preventDefault();
        const finalData = { ...data, gender: gender, status: status }
        console.log(finalData);
        axios.post('https://65bc5f2952189914b5bdcf3a.mockapi.io/Users', finalData)
            .then(function () {
                alert("User added successfully!!!");
                setShowAddModal(false);
            })
            .catch(function (error) {
                console.log(error);
                alert("User added failed! Please check all information and try again")
            });
        reset();
    }

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
    }, [filterLs, showAddModal])

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
                <Button
                    title={"Add User"}
                    firstIcon={<AddIcon />}
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                />
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
                            if (filterLs.length === 0) {
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
                        {result.map(item => (<TableRow item={item} key={item.id} />))}
                    </tbody>
                    :
                    <tbody className={cx("tbody")}>
                        {currentPageData.map(item => (<TableRow item={item} key={item.id} />))}
                    </tbody>}
            </table>

            {/* phan chuyen trang */}
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

            {/* modal add new user */}
            {
                showAddModal && <div className={cx("modal-add")}>
                    <form
                        className={cx("modal-container")}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={cx("heading")}>
                            <button className={cx("close", "disabled")} />
                            <span>Add a new user</span>
                            <button
                                className={cx("close")}
                                type="reset"
                                onClick={() => {
                                    reset()
                                    setShowAddModal(false)
                                }}
                            >
                                <CancleIcon />
                            </button>
                        </div>

                        <div className={cx("body")}>
                            {/* User type */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>User type</label>
                                <select
                                    className={cx("input")}
                                    {...register("role")}
                                >
                                    <option value={0}>Select one</option>
                                    <option value={1}>Super Admin</option>
                                    <option value={2}>Admin</option>
                                    <option value={3}>Trainer</option>
                                </select>
                            </div>
                            {errors.role && <p className={cx("error")}>{errors.role?.message}</p>}

                            {/* Name */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Name</label>
                                <input
                                    {...register("name")}
                                    className={cx("input")}
                                    placeholder="User name"
                                />
                            </div>
                            {errors.name && <p className={cx("error")}>{errors.name?.message}</p>}

                            {/* Email */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Email Address</label>
                                <input
                                    {...register("email")}
                                    className={cx("input")}
                                    placeholder="Email address"
                                />
                            </div>
                            {errors.email && <p className={cx("error")}>{errors.email?.message}</p>}

                            {/* Phone */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Phone</label>
                                <input
                                    {...register("phone")}
                                    className={cx("input")}
                                    placeholder="Phone number"
                                />
                            </div>
                            {errors.phone && <p className={cx("error")}>{errors.phone?.message}</p>}

                            {/* DOB */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Date of birth</label>
                                <input
                                    {...register("dob")}
                                    className={cx("input")}
                                    type="date"
                                />
                            </div>
                            {errors.dob && <p className={cx("error")}>{errors.dob?.message}</p>}

                            {/* Gender */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Gender</label>
                                <span>
                                    <input type="radio" value={true} checked={gender === true} onChange={() => { setGender(true) }} />
                                    Male
                                </span>
                                <span>
                                    <input type="radio" value={false} checked={gender === false} onChange={() => { setGender(false) }} />
                                    Female
                                </span>
                            </div>

                            {/* Status */}
                            <div className={cx("field")}>
                                <label className={cx("label")}>Status</label>
                                {status ?
                                    <p
                                        className={cx("switch", "active")}
                                        onClick={() => { setStatus(false) }}
                                    >
                                        <span className={cx("status")}>Active</span>
                                        <span className={cx("dot")}></span>
                                    </p>
                                    :
                                    <p
                                        className={cx("switch", "inactive")}
                                        onClick={() => { setStatus(true) }}
                                    >
                                        <span className={cx("dot")}></span>
                                        <span className={cx("status")}>Inactive</span>
                                    </p>
                                }
                            </div>

                            <div className={cx("field", "btn-group")}>
                                <button
                                    className={cx("cancel")}
                                    type="reset"
                                    onClick={() => {
                                        reset()
                                        setShowAddModal(false)
                                    }}
                                >
                                    Cancel
                                </button>
                                <button className={cx("save")} type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div >
    );
}

export default UserListPage;