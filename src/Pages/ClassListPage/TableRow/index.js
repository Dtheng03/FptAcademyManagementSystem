import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { DeleteForeverIcon, CreateIcon, CopyIcon } from "../../../Components/Common/Icons/DocManageIcons";
import { Popover, notification, Modal, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { AttendeeStyle, StatusStyle } from "../Styles";
import axios from "axios";
import crypto from "crypto-js";
import axiosClient from "../../../Services/axios/config";
import { changeStatus } from "../../../Services/classApi";
import { color } from "d3";

const cx = classNames.bind(styles);

function TableRow({ item, domChange, domChangeSuccess, reload }) {
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
    };

    const [open, setOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState('');

    var decryptedRoleName;
    const encryptedRoleName = sessionStorage.getItem("roleName");
    if (encryptedRoleName) {
        decryptedRoleName = crypto.AES.decrypt(
            encryptedRoleName,
            "react02"
        ).toString(crypto.enc.Utf8);
    }
    const roleName = decryptedRoleName;

    const navigate = useNavigate();

    const handleDoubleClick = (selectedItem) => {
        navigate(`/view-class-detail/${selectedItem.id}`);
    };

    const handleAction = (action) => {
        setModalAction(action);
        setModalVisible(true);
        setOpen(false);
    };

    const handleDelete = () => {
        axios
            .delete(`https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${item.id}`)
            .then(() => {
                notification.success({
                    message: 'Delete class successfully',
                    duration: '1.5'
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: 'Delete class failed',
                    description: 'Please try again!',
                    duration: '1.5'
                });
            });
        reload();
    }

    const handleDuplicate = () => {
        const duplicatedClass = { ...item };
        delete duplicatedClass.id;
        axios
            .post('https://653d1d13f52310ee6a99e3b7.mockapi.io/class', duplicatedClass)
            .then(() => {
                notification.success({
                    message: 'Duplicate class successfully',
                    duration: '1.5'
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: 'Duplicate class failed',
                    description: 'Please try again!',
                    duration: '1.5'
                });
            });
        reload();
    }

    const handleChangeStatus = () => {
        changeStatus(item.id)
            // .then(() => {
            //     domChangeSuccess();
            // })
    }

    const performAction = () => {
        if (modalAction === 'duplicate') {
            handleDuplicate();
        } else if (modalAction === 'delete') {
            handleDelete();
        } else if (modalAction === 'change') {
            handleChangeStatus();
        }
        setModalVisible(false);
    };

    return (
        <>
            <tr className={cx("tr")} onDoubleClick={() => handleDoubleClick(item)}>
                {/* <td className={cx("td", "id")}>{item.id}</td> */}
                <td className={cx("td", "name")}>{item.className}</td>
                <td className={cx("td", "code")}>{item.classCode}</td>
                <td className={cx("td", "createdon")}>{item.createdOn}</td>
                <td className={cx("td", "createdby")}>{item.createdBy.fullName}</td>
                <td className={cx("td", "duration")}>{item.duration} days</td>
                {/* <td className={cx("td", "attendee")}><AttendeeStyle attendee={item.attendee} /></td> */}
                <td className={cx("td")}><StatusStyle status={item.status} /></td>
                <td className={cx("td", "location")}>{item.location}</td>
                <td className={cx("td")}>{item.fsu}</td>
                {(roleName === "Super Admin" || roleName === "Admin") &&
                    <td className={cx("td")}>
                        <Popover
                            trigger="click"
                            placement="right"
                            open={open}
                            onOpenChange={() => {
                                setOpen(!open);
                            }}
                            content={
                                <>
                                    <button
                                        style={style}
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CreateIcon />
                                        Edit class
                                    </button>

                                    <button
                                        style={style}
                                        onClick={() => { handleAction('duplicate'); domChange() }}
                                    >
                                        <CopyIcon />
                                        Duplicate class
                                    </button>

                                    <button
                                        style={style}
                                        onClick={() => { handleAction('change'); domChange(); }}
                                    >
                                        {item.classStatus === 'Inactive' ? (
                                            <>
                                                <VisibilityIcon />
                                                Activate
                                            </>
                                        ) : (
                                            <>
                                                <VisibilityOffIcon />
                                                De-activate
                                            </>
                                        )}
                                    </button>

                                    {/* <button
                                        style={{ ...style, color: 'red' }}
                                        onClick={() => { handleAction('delete'); domChange() }}
                                    >
                                        <DeleteForeverIcon />
                                        Delete class
                                    </button> */}
                                </>
                            }
                        >
                            <Button className={cx('more-btn')} onClick={() => setOpen(!open)}>
                                <MoreIcon />
                            </Button>
                        </Popover>
                    </td>}
            </tr >

            <Modal
                title={
                    modalAction === 'delete'
                        ? 'Delete Class'
                        : modalAction === 'duplicate'
                            ? 'Duplicate Class'
                            : 'Change Status Class'
                }
                open={isModalVisible}
                onOk={performAction}
                onCancel={() => setModalVisible(false)}
                okText={
                    modalAction === 'delete' ? 'Delete'
                        : modalAction === 'duplicate'
                            ? 'Duplicate'
                            : 'Change'
                }
                okButtonProps={{
                    style: { backgroundColor: '#2D3748', color: '#fff' },
                }}
                cancelButtonProps={{
                    style: { color: '#ff0000', border: 'none' },
                }}
                centered={true}
            >
                {modalAction === 'delete'
                    ? `Do you want to delete the "${item.className}" class? This action cannot be undone.`
                    : modalAction === 'duplicate'
                        ? `Do you want to duplicate the "${item.className}" class?`
                        : `Do you want to change the status of the "${item.className}" class?`}
            </Modal>
        </>
    );
}

export default TableRow;
