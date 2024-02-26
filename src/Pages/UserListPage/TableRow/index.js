import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon, RoleIcon } from "../../../Components/Common/Icons/OtherIcons";
import { DeleteForeverIcon, CreateIcon } from "../../../Components/Common/Icons/DocManageIcons"
import { Popover } from 'antd';
import { useDispatch } from "react-redux";
import { setUpdateUser } from "../../../Redux/Reducer/UserSlice";
import { notification, Popconfirm } from 'antd';
import axios from "axios";

const cx = classNames.bind(styles);

function TypeChip({ role }) {

    var type, className;

    if (role === 1) {
        type = "Super Admin";
        className = "super-admin";
    } else if (role === 2) {
        type = "Admin";
        className = "admin";
    } else if (role === 3) {
        type = "Trainer";
        className = "trainer";
    }

    return (
        <span className={cx("type-chip", className)}>
            {type}
        </span>
    );
}

function StatusChip({ status }) {
    var type, className;

    if (status === true) {
        type = "Acitive";
        className = "active";
    } else if (status === false) {
        type = "Inactive";
        className = "inactive";
    }

    return (
        <span className={cx("status-chip", className)}>
            {type}
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
    const userRole = sessionStorage.getItem("userRole");

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [newRole, setNewRole] = useState();
    const [newStatus, setNewStatus] = useState();

    // hàm xử lý thay đổi role
    const handleChangeRole = () => {
        axios.put(`https://65bc5f2952189914b5bdcf3a.mockapi.io/Users/${item.id}`, { role: newRole })
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
                    description: "Please try again!"
                })
            });
    };

    // hàm xử lý thay đổi status
    const handleChangeStatus = () => {
        axios.put(`https://65bc5f2952189914b5bdcf3a.mockapi.io/Users/${item.id}`, { status: newStatus })
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
                    description: "Please try again!"
                })
            });
    }

    // hàm xử lý xóa user
    // const handleDeleteUser = () => {
    //     axios.delete(`https://65bc5f2952189914b5bdcf3a.mockapi.io/Users/${item.id}`)
    //         .then(() => {
    //             notification.success({
    //                 message: "Delete user successfully",
    //             });
    //             domChangeSuccess();
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             notification.error({
    //                 message: "Delete user failed",
    //                 description: "Please try again!"
    //             })
    //         });
    // }

    return (
        <tr className={cx("tr")}>
            <td className={cx("td", "id")}>{item.id}</td>
            <td className={cx("td", "name")}>{item.name}</td>
            <td className={cx("td")}>{item.email}</td>
            <td className={cx("td")}>{item.dob}</td>
            <td className={cx("td")}>{item.gender ? <MaleIcon /> : <FemaleIcon />}</td>
            <td className={cx("td")}><TypeChip role={item.role} /></td>
            <td className={cx("td")}><StatusChip status={item.status} /></td>
            {userRole === "superAdmin" && < td className={cx("td")}>
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
                                                    setNewRole(1);
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
                                                    setNewRole(2)
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
                                                    setNewRole(3)
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
                                {item.status ?
                                    <button style={style} onClick={() => {
                                        setNewStatus(false);
                                        domChange();
                                    }}>
                                        <VisibilityOffIcon />
                                        De-activate user
                                    </button> :
                                    <button style={style} onClick={() => {
                                        setNewStatus(true);
                                        domChange();
                                    }}>
                                        <VisibilityIcon />
                                        Activate user
                                    </button>
                                }
                            </Popconfirm>
                            {/* <Popconfirm
                                trigger={"click"}
                                title="Delete user"
                                description="Are you sure to delete this user?"
                                placement="left"
                                onConfirm={handleDeleteUser}
                            >
                                <button style={{ ...style, color: "red" }} onClick={() => domChange()}>
                                    <DeleteForeverIcon />
                                    Delete user
                                </button>
                            </Popconfirm> */}
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