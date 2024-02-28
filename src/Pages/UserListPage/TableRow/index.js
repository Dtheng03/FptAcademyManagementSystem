import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon, RoleIcon } from "../../../Components/Common/Icons/OtherIcons";
import { CreateIcon } from "../../../Components/Common/Icons/DocManageIcons"
import { Popover } from 'antd';
import { useDispatch } from "react-redux";
import { setUpdateUser } from "../../../Redux/Reducer/UserSlice";
import { notification, Popconfirm } from 'antd';
import axios from "axios";
import crypto from "crypto-js";

const cx = classNames.bind(styles);

function TypeChip({ roleName }) {
    var className;

    if (roleName === "Super Admin") {
        className = "super-admin";
    } else if (roleName === "Admin") {
        className = "admin";
    } else if (roleName === "Trainer") {
        className = "trainer";
    }

    return (
        <span className={cx("type-chip", className)}>
            {roleName}
        </span>
    );
}

function StatusChip({ status }) {
    var className;

    if (status === "Active") {
        className = "active";
    } else if (status === "Inactive") {
        className = "inactive";
    }

    return (
        <span className={cx("status-chip", className)}>
            {status}
        </span>
    );
}

function TableRow({ item, openEdit, domChange, domChangeSuccess }) {
    const style = {
        backgroundColor: "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: "12%",
        width: "160px",
        height: "40px",
        fontWeight: "bold",
        color: "#4F6181",
        cursor: "pointer",
    }

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

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [newRole, setNewRole] = useState(item.roleName);

    // hàm xử lý thay đổi role
    const handleChangeRole = () => {
        axios.put(`http://fams-group1-net03.ptbiology.com/api/user/grant-permission`, { id: item.id, userType: newRole })
            .then(() => {
                notification.success({
                    message: "Change role successfully",
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: "Change role failed",
                    description: "Something wrong! Please try again later!"
                })
            });
    };

    // hàm xử lý thay đổi status
    const handleChangeStatus = () => {
        axios.put(`http://fams-group1-net03.ptbiology.com/api/user/active-deactive-user?id=${item.id}`)
            .then(() => {
                notification.success({
                    message: "Change status successfully",
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: "Change status failed",
                    description: "Something wrong! Please try again later!"
                })
            });
    }

    return (
        <tr className={cx("tr")}>
            <td className={cx("td", "name")}>{item.fullName}</td>
            <td className={cx("td")}>{item.email}</td>
            <td className={cx("td")}>{item.dob}</td>
            <td className={cx("td")}>{item.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}</td>
            <td className={cx("td")}><TypeChip roleName={item.roleName} /></td>
            <td className={cx("td")}><StatusChip status={item.status} /></td>
            {roleName === "Super Admin" && < td className={cx("td")}>
                <Popover
                    trigger="click"
                    placement="left"
                    open={open}
                    onOpenChange={() => { setOpen(!open) }}
                    content={
                        <>
                            <button style={style} onClick={() => {
                                dispatch(setUpdateUser(item))
                                setOpen(false)
                                openEdit()
                            }}>
                                <CreateIcon />
                                Edit user
                            </button>
                            <Popover
                                trigger="click"
                                placement="left"
                                content={
                                    <>
                                        <Popconfirm
                                            trigger={"click"}
                                            title="Change role"
                                            description="Are you sure to change role of this user?"
                                            placement="left"
                                            onConfirm={handleChangeRole}
                                        >
                                            <button
                                                style={{ ...style, width: "100px" }}
                                                onClick={() => {
                                                    setNewRole("SuperAdmin");
                                                    domChange();
                                                }}
                                            >
                                                Super Admin
                                            </button>
                                        </Popconfirm>
                                        <Popconfirm
                                            trigger={"click"}
                                            title="Change role"
                                            description="Are you sure to change role of this user?"
                                            placement="left"
                                            onConfirm={handleChangeRole}
                                        >
                                            <button
                                                style={{ ...style, width: "100px" }}
                                                onClick={() => {
                                                    setNewRole("Admin")
                                                    domChange();
                                                }}
                                            >
                                                Class Admin
                                            </button>
                                        </Popconfirm>
                                        <Popconfirm
                                            trigger={"click"}
                                            title="Change role"
                                            description="Are you sure to change role of this user?"
                                            placement="left"
                                            onConfirm={handleChangeRole}
                                        >
                                            <button
                                                style={{ ...style, width: "100px" }}
                                                onClick={() => {
                                                    setNewRole("Trainer")
                                                    domChange();
                                                }}
                                            >
                                                Trainer
                                            </button>
                                        </Popconfirm>
                                    </>
                                }
                            >
                                <button style={style}>
                                    <RoleIcon />
                                    Change role
                                </button>
                            </Popover>
                            <Popconfirm
                                trigger={"click"}
                                title="Change status"
                                description="Are you sure to change status of this user?"
                                placement="left"
                                onConfirm={handleChangeStatus}
                            >
                                {item.status === "Active" ?
                                    <button style={style} onClick={() => {
                                        domChange();
                                    }}>
                                        <VisibilityOffIcon />
                                        De-activate user
                                    </button> :
                                    <button style={style} onClick={() => {
                                        domChange();
                                    }}>
                                        <VisibilityIcon />
                                        Activate user
                                    </button>
                                }
                            </Popconfirm>
                        </>
                    }
                >
                    <button className={cx("more-btn")} onClick={() => { setOpen(!open) }}>
                        <MoreIcon />
                    </button>
                </Popover>
            </td>}
        </tr >
    );
}

export default TableRow;