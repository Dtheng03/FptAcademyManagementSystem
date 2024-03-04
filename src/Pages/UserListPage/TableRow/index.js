import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon, RoleIcon } from "../../../Components/Common/Icons/OtherIcons";
import { CreateIcon } from "../../../Components/Common/Icons/DocManageIcons"
import { useDispatch } from "react-redux";
import { setUpdateUser } from "../../../Redux/Reducer/UsersSlice";
import { notification, Modal } from 'antd';
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

function TableRow({ item, openEdit, domChange, domChangeSuccess, refresh }) {
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

    const [newRole, setNewRole] = useState(item.roleName);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [isLoadingRole, setIsLoadingRole] = useState(false);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);

    // hàm xử lý thay đổi role
    const handleChangeRole = () => {
        setIsLoadingRole(true);
        axios.put(`http://fams-group1-net03.ptbiology.com/api/user/grant-permission`, { id: item.id, userType: newRole })
            .then(() => {
                setIsLoadingRole(false);
                setShowRoleModal(!showRoleModal);
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
                setIsLoadingRole(false);
                setShowRoleModal(!showRoleModal);
            });
        refresh();
    };

    // hàm xử lý thay đổi status
    const handleChangeStatus = () => {
        setIsLoadingStatus(true);
        axios.put(`http://fams-group1-net03.ptbiology.com/api/user/active-deactive-user?id=${item.id}`)
            .then(() => {
                setIsLoadingStatus(false);
                setShowStatusModal(!showStatusModal);
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
                setIsLoadingStatus(false);
                setShowStatusModal(!showStatusModal);
            });
        refresh();
    }

    return (
        <>
            <tr className={cx("tr")}>
                <td className={cx("td", "name")}>{item.fullName}</td>
                <td className={cx("td")}>{item.email}</td>
                <td className={cx("td")}>{item.dob}</td>
                <td className={cx("td")}>{item.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}</td>
                <td className={cx("td")}><TypeChip roleName={item.roleName} /></td>
                <td className={cx("td")}><StatusChip status={item.status} /></td>
                {roleName === "Super Admin" && < td className={cx("td")}>
                    <div className={cx("more")}>
                        <button
                            className={cx("more-btn")}
                        >
                            <MoreIcon />
                        </button>
                        <div className={cx("more-menu")}>
                            {/* btn edit */}
                            <button
                                className={cx("option")}
                                onClick={() => {
                                    dispatch(setUpdateUser(item));
                                    openEdit();
                                }}>
                                <CreateIcon />
                                Edit user
                            </button>

                            {/* btn change role */}
                            <div className={cx("change-role")}>
                                <button
                                    className={cx("option")}
                                >
                                    <RoleIcon />
                                    Change role
                                </button>
                                <div className={cx("role-menu")}>
                                    <button
                                        className={cx("role")}
                                        onClick={() => {
                                            setNewRole("Super Admin");
                                            setShowRoleModal(true);
                                            domChange();
                                        }}
                                    >
                                        Super Admin
                                    </button>
                                    <button
                                        className={cx("role")}
                                        onClick={() => {
                                            setNewRole("Admin");
                                            setShowRoleModal(true);
                                            domChange();
                                        }}
                                    >
                                        Class Admin
                                    </button>
                                    <button
                                        className={cx("role")}
                                        onClick={() => {
                                            setNewRole("Trainer");
                                            setShowRoleModal(true);
                                            domChange();
                                        }}
                                    >
                                        Trainer
                                    </button>
                                </div>
                            </div>

                            {/* btn change status */}
                            {item.status === "Active" ?
                                <button className={cx("option")} onClick={() => {
                                    setShowStatusModal(true);
                                    domChange();
                                }}>
                                    <VisibilityOffIcon />
                                    De-activate user
                                </button> :
                                <button className={cx("option")} onClick={() => {
                                    setShowStatusModal(true);
                                    domChange();
                                }}>
                                    <VisibilityIcon />
                                    Activate user
                                </button>}
                        </div>
                    </div>
                </td>}
            </tr >

            {/* modal confirm change role */}
            < Modal
                title="Are you sure to change role of user?"
                open={showRoleModal}
                onOk={() => { handleChangeRole() }}
                onCancel={() => { setShowRoleModal(false) }}
                confirmLoading={isLoadingRole}
                width={360}
                centered={true}
            />

            {/* modal comfirm change status */}
            < Modal
                title="Are you sure to change status of user?"
                open={showStatusModal}
                onOk={() => { handleChangeStatus() }}
                onCancel={() => { setShowStatusModal(false) }}
                confirmLoading={isLoadingStatus}
                width={360}
                centered={true}
            />
        </>
    );
}

export default TableRow;