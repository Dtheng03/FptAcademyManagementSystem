import styles from "./UserListPage.module.scss";
import classNames from "classnames/bind";
import SearchWithIcon from "../../Components/Common/InputBox/SearchWithIcon/SearchWithIcon";
import Button from "../../Components/Common/Button";
import { FilterListIcon, AddIcon, SortIcon, MoreIcon } from "../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon } from "../../Components/Common/Icons/OtherIcons";
import StatusChip from "../../Components/Common/Status/StatusChip";
import { Pagination, Tag } from "antd";

const cx = classNames.bind(styles);

function UserListPage() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={cx("container")}>
            <h4 className={cx("header")}>User Management</h4>
            <div className={cx("action")}>
                <div className={cx("search")}>
                    <SearchWithIcon />
                    <Button title={"Filter"} firstIcon={<FilterListIcon />} />
                </div>
                <Button title={"Add User"} firstIcon={<AddIcon />} />
            </div>
            <div className={cx("search-result")}>
                <Tag className={cx("result")} color="#474747" closable >foundation</Tag>
                <Tag className={cx("result")} color="#474747" closable >HaNTT2</Tag>
            </div>
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
                <tbody className={cx("tbody")}>
                    {data.map(item => (
                        <tr className={cx("tr")} key={item}>
                            <td className={cx("td", "id")}>1</td>
                            <td className={cx("td", "name")}>Trương Mộc Thảo Ngân</td>
                            <td className={cx("td")}>truongmocthaongan@gmail.com</td>
                            <td className={cx("td")}>31/12/2000</td>
                            <td className={cx("td")}><FemaleIcon /></td>
                            <td className={cx("td")}><StatusChip title={"Admin"} /></td>
                            <td className={cx("td")}><MoreIcon /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx("pagination")}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={() => { }}
                    defaultCurrent={3}
                    total={500}
                />
            </div>
        </div>
    );
}

export default UserListPage;