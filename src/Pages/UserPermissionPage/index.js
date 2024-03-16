import styles from "./UserPermissionPage.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import { AddIcon, VisibilityIcon, VisibilityOffIcon } from "../../Components/Common/Icons/ActionIcons";
import { CreateIcon } from "../../Components/Common/Icons/DocManageIcons";
import { GradeIcon } from "../../Components/Common/Icons/IndicatorIcons";
import { useEffect, useState } from "react";
import crypto from "crypto-js";
import { getUserPermission, updateUserPermission } from "../../Services/usersApi";

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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        updateUserPermission(newPermission1, newPermission2, newPermission3)
            .then(() => {
                setUpdate(false);
                setIsDomChange(!isDomChange);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        setIsLoading(true);
        getUserPermission()
            .then((response) => {
                setData(response?.data?.data || []);
                setNewPermission1(response?.data?.data[0]);
                setNewPermission2(response?.data?.data[1]);
                setNewPermission3(response?.data?.data[2]);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [isDomChange]);

    return (
        <div className={cx("container")}>
            {!isLoading ?
                <>
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
                                                defaultValue={item.syllabus}
                                                onChange={(e) => handleChange(e, item)}
                                            >
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
                                                defaultValue={item.trainingProgram}
                                                onChange={(e) => handleChange(e, item)}
                                            >
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
                                                defaultValue={item.class}
                                                onChange={(e) => handleChange(e, item)}
                                            >
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
                                                defaultValue={item.learningMaterial}
                                                onChange={(e) => handleChange(e, item)}
                                            >
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
                </>
                :
                (<div className={cx("modal")}>
                    <div className={cx("loading")}></div>
                </div>)
            }
        </div >
    );
}

export default UserPermissionPage;