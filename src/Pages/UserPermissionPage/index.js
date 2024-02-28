import styles from "./UserPermissionPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, VisibilityIcon, VisibilityOffIcon } from "../../Components/Common/Icons/ActionIcons";
import { CreateIcon } from "../../Components/Common/Icons/DocManageIcons";
import { GradeIcon } from "../../Components/Common/Icons/IndicatorIcons";
import { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import crypto from "crypto-js";

const cx = classNames.bind(styles);

const Permission = ({ permission }) => {
    switch (permission) {
        case "Access denied": return (<span className={cx("permission")}><VisibilityOffIcon />{permission}</span>);
        case "View": return (<span className={cx("permission")}><VisibilityIcon />{permission}</span>);
        case "Modify": return (<span className={cx("permission")}><CreateIcon />{permission}</span>);
        case "Create": return (<span className={cx("permission")}><AddIcon />{permission}</span>);
        case "Full access": return (<span className={cx("permission")}><GradeIcon />{permission}</span>);
    }
}

function UserPermissionPage() {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Decode roleName đã mã hóa
    var decryptedRoleName;
    const encryptedRoleName = sessionStorage.getItem("roleName");
    if (encryptedRoleName) {
        decryptedRoleName = crypto.AES.decrypt(
            encryptedRoleName,
            "react02"
        ).toString(crypto.enc.Utf8);
    }
    const roleName = decryptedRoleName;

    const [data, setData] = useState([]);
    const [isDomChange, setIsDomChange] = useState(false);
    const [update, setUpdate] = useState(false);
    const [newPermission1, setNewPermission1] = useState({});
    const [newPermission2, setNewPermission2] = useState({});
    const [newPermission3, setNewPermission3] = useState({});

    const handleChange = (e, item) => {
        if (item.roleName === "Super Admin") {
            setNewPermission1({
                ...newPermission1,
                id: item.id,
                [e.target.name]: e.target.value,
            })
        } else if (item.roleName === "Admin") {
            setNewPermission2({
                ...newPermission2,
                id: item.id,
                [e.target.name]: e.target.value,
            })
        } else if (item.roleName === "Trainer") {
            setNewPermission3({
                ...newPermission3,
                id: item.id,
                [e.target.name]: e.target.value,
            })
        }
    };

    const handleSaveUpdate = () => {
        async function update() {
            var response1, response2, response3;
            try {
                response1 = await axios.put(`http://fams-group1-net03.ptbiology.com/api/userpermission/update-user-permission`, { ...newPermission1, userManagement: "Full access" });
                response2 = await axios.put(`http://fams-group1-net03.ptbiology.com/api/userpermission/update-user-permission`, { ...newPermission2, userManagement: "Create" });
                response3 = await axios.put(`http://fams-group1-net03.ptbiology.com/api/userpermission/update-user-permission`, { ...newPermission3, userManagement: "View" });
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
        axios.get("http://fams-group1-net03.ptbiology.com/api/userpermission/view-user-permission")
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => { console.log(error); })
    }, [isDomChange]);

    return (
        <div className={cx("container")}>
            <h4 className={cx("header")}>User Permission</h4>

            {/* phần actions */}
            {roleName === "Super Admin" && < div className={cx("action")}>
                {!update && <Button title={"Update Permission"} onClick={() => setUpdate(true)} />}
            </div>}

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
                                <td className={cx("td", "roleName")}>{item.roleName}</td>
                                <td className={cx("td")}><Permission permission={item.syllabus} /></td>
                                <td className={cx("td")}><Permission permission={item.trainingProgram} /></td>
                                <td className={cx("td")}><Permission permission={item.class} /></td>
                                <td className={cx("td")}><Permission permission={item.learningMaterial} /></td>
                                <td className={cx("td")}><Permission permission={item.userManagement} /></td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody className={cx("tbody")}>
                        {data.map((item, index) => (
                            <tr key={index} className={cx("tr")}>
                                <td className={cx("td")}>{item.roleName}</td>
                                <td className={cx("td")}>
                                    <select
                                        name="syllabus"
                                        className={cx("select")}
                                        onChange={(e) => handleChange(e, item)}
                                    >
                                        <option>Permission</option>
                                        <option value={"Access denied"}>Access denied</option>
                                        <option value={"View"}>View</option>
                                        <option value={"Modify"}>Modify</option>
                                        <option value={"Create"}>Create</option>
                                        <option value={"Full access"}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select
                                        name="trainingProgram"
                                        className={cx("select")}
                                        onChange={(e) => handleChange(e, item)}
                                    >
                                        <option>Permission</option>
                                        <option value={"Access denied"}>Access denied</option>
                                        <option value={"View"}>View</option>
                                        <option value={"Modify"}>Modify</option>
                                        <option value={"Create"}>Create</option>
                                        <option value={"Full access"}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select
                                        name="class"
                                        className={cx("select")}
                                        onChange={(e) => handleChange(e, item)}
                                    >
                                        <option>Permission</option>
                                        <option value={"Access denied"}>Access denied</option>
                                        <option value={"View"}>View</option>
                                        <option value={"Modify"}>Modify</option>
                                        <option value={"Create"}>Create</option>
                                        <option value={"Full access"}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}>
                                    <select
                                        name="learningMaterial"
                                        className={cx("select")}
                                        onChange={(e) => handleChange(e, item)}
                                    >
                                        <option>Permission</option>
                                        <option value={"Access denied"}>Access denied</option>
                                        <option value={"View"}>View</option>
                                        <option value={"Modify"}>Modify</option>
                                        <option value={"Create"}>Create</option>
                                        <option value={"Full access"}>Full access</option>
                                    </select>
                                </td>
                                <td className={cx("td")}><Permission permission={item.userManagement} /></td>
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