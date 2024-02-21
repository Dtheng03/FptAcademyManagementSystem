import styles from "./UserPermissionPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, VisibilityIcon, VisibilityOffIcon } from "../../Components/Common/Icons/ActionIcons";
import { CreateIcon } from "../../Components/Common/Icons/DocManageIcons";
import { GradeIcon } from "../../Components/Common/Icons/IndicatorIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";

const cx = classNames.bind(styles);

const RoleName = ({ roleId }) => {
    switch (roleId) {
        case 1: return <span className={cx("roleName")}>Super Admin</span>;
        case 2: return <span className={cx("roleName")}>Class Admin</span>;
        case 3: return <span className={cx("roleName")}>Trainer</span>;
    }
};

const Permission = ({ number }) => {
    switch (number) {
        case 1: return (<span className={cx("permission")}><VisibilityOffIcon />Access denied</span>);
        case 2: return (<span className={cx("permission")}><VisibilityIcon />View</span>);
        case 3: return (<span className={cx("permission")}><CreateIcon />Modify</span>);
        case 4: return (<span className={cx("permission")}><AddIcon />Create</span>);
        case 5: return (<span className={cx("permission")}><GradeIcon />Full access</span>);
    }
}

function UserPermissionPage() {

    const [data, setData] = useState([]);
    const [isDomChange, setIsDomChange] = useState(false);
    const [update, setUpdate] = useState(false);
    const [newPermission1, setNewPermission1] = useState({});
    const [newPermission2, setNewPermission2] = useState({});
    const [newPermission3, setNewPermission3] = useState({});

    const handleChange = (e, id) => {
        if (id == 1) {
            setNewPermission1({
                ...newPermission1,
                [e.target.name]: Number(e.target.value)
            })
        } else if (id == 2) {
            setNewPermission2({
                ...newPermission2,
                [e.target.name]: Number(e.target.value)
            })
        } else if (id == 3) {
            setNewPermission3({
                ...newPermission3,
                [e.target.name]: Number(e.target.value)
            })
        }
    };

    const handleSaveUpdate = () => {
        async function update() {
            try {
                const response1 = await axios.put(`https://65bc5f2952189914b5bdcf3a.mockapi.io/permission/${1}`, newPermission1);
                const response2 = await axios.put(`https://65bc5f2952189914b5bdcf3a.mockapi.io/permission/${2}`, newPermission2);
                const response3 = await axios.put(`https://65bc5f2952189914b5bdcf3a.mockapi.io/permission/${3}`, newPermission3);
                if (response1.statusText === "OK" && response2.statusText === "OK" && response3.statusText === "OK") {
                    notification.success({
                        message: "Update permission successfully",
                    })
                    setTimeout(() => {
                        setUpdate(false);
                        setIsDomChange(!isDomChange);
                    }, 2000)
                }
            } catch (error) {
                console.error(error);
                notification.error({
                    message: "Update permission failed",
                    description: "Please try again"
                })
            }
        }

        update();
    }

    useEffect(() => {
        axios.get("https://65bc5f2952189914b5bdcf3a.mockapi.io/permission")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => { console.log(error); })
    }, [isDomChange]);

    return (
        <div className={cx("container")}>
            <h4 className={cx("header")}>User Permission</h4>

            {/* phần actions */}
            <div className={cx("action")}>
                {!update && <Button title={"Update Permission"} onClick={() => setUpdate(true)} />}
            </div>

            {/* phần hiển thị thông tin */}
            <table className={cx("table")}>
                <thead className={cx("thead")}>
                    <tr className={cx("tr")}>
                        <th className={cx("th")}>Role name</th>
                        <th className={cx("th")}>Syllabus</th>
                        <th className={cx("th")}>Training Program</th>
                        <th className={cx("th")}>Class</th>
                        <th className={cx("th")}>Learning material</th>
                        <th className={cx("th")}>User</th>
                    </tr>
                </thead>
                {!update ?
                    <tbody className={cx("tbody")}>
                        {data.map((item, index) => (
                            <tr key={index} className={cx("tr")}>
                                <td className={cx("td")}><RoleName roleId={item.roleName} /></td>
                                <td className={cx("td")}><Permission number={item.syllabus} /></td>
                                <td className={cx("td")}><Permission number={item.trainingProgram} /></td>
                                <td className={cx("td")}><Permission number={item.class} /></td>
                                <td className={cx("td")}><Permission number={item.learningMaterial} /></td>
                                <td className={cx("td")}><Permission number={item.user} /></td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody className={cx("tbody")}>
                        {data.map((item, index) => (
                            <tr key={index} className={cx("tr")}>
                                <td className={cx("td")}><RoleName roleId={item.roleName} /></td>
                                <td className={cx("td")}>
                                    <select name="syllabus" className={cx("select")} onChange={(e) => handleChange(e, item.id)}>
                                        <option>Permission</option>0
                                        <option value={1}>Access Denied</option>
                                        <option value={2}>View</option>
                                        <option value={3}>Modify</option>
                                        <option value={4}>Create</option>
                                        <option value={5}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select name="trainingProgram" className={cx("select")} onChange={(e) => handleChange(e, item.id)}>
                                        <option>Permission</option>
                                        <option value={1}>Access Denied</option>
                                        <option value={2}>View</option>
                                        <option value={3}>Modify</option>
                                        <option value={4}>Create</option>
                                        <option value={5}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select name="class" className={cx("select")} onChange={(e) => handleChange(e, item.id)}>
                                        <option>Permission</option>
                                        <option value={1}>Access Denied</option>
                                        <option value={2}>View</option>
                                        <option value={3}>Modify</option>
                                        <option value={4}>Create</option>
                                        <option value={5}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select name="learningMaterial" className={cx("select")} onChange={(e) => handleChange(e, item.id)}>
                                        <option>Permission</option>
                                        <option value={1}>Access Denied</option>
                                        <option value={2}>View</option>
                                        <option value={3}>Modify</option>
                                        <option value={4}>Create</option>
                                        <option value={5}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}><Permission number={item.user} /></td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>

            {
                update &&
                <div className={cx("action")}>
                    <Button title={"Cancle"} type="underline" onClick={() => setUpdate(false)} />
                    <Button title={"Save"} onClick={handleSaveUpdate} />
                </div>
            }
        </div >
    );
}

export default UserPermissionPage;