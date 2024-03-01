import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { DeleteForeverIcon, CreateIcon, CopyIcon } from "../../../Components/Common/Icons/DocManageIcons";
import { Popover, notification, Modal, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function AttendeeStyle({ attendee }) {
    var className, title;
    if (attendee === "Fresher") {
        className = "fresher"
        title = "Fresher"
    } else if (attendee === "Intern") {
        className = "intern"
        title = "Intern"
    } else if (attendee === "Online fee-fresher") {
        className = "online-fee-fresher"
        title = "Online fee-fresher"
    } else if (attendee === "Offline fee-fresher") {
        className = "offline-fee-fresher"
        title = "Offline fee-fresher"
    }

    return (
        <span className={cx("attendee-style", className)}>
            {title}
        </span>
    );
}

function TableRow({ item, domChange, domChangeSuccess }) {
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
    const [newStatus, setNewStatus] = useState('');

    const navigate = useNavigate();

    const handleDoubleClick = (selectedItem) => {
        navigate(`/view-class-detail/${selectedItem.id}`);
    };

    const handleAction = (action) => {
        setModalAction(action);
        setNewStatus('');
        setModalVisible(true);
        setOpen(false);
    };

    const performAction = () => {
        if (modalAction === 'duplicate') {
            // Duplicate class
            const duplicatedClass = { ...item };
            delete duplicatedClass.id;
            axios
                .post('https://653d1d13f52310ee6a99e3b7.mockapi.io/class', duplicatedClass)
                .then(() => {
                    notification.success({
                        message: 'Duplicate class successfully',
                    });
                    domChangeSuccess();
                })
                .catch(function (error) {
                    console.log(error);
                    notification.error({
                        message: 'Duplicate class failed',
                        description: 'Please try again!',
                    });
                });
        } else if (modalAction === 'delete') {
            //delete class
            axios
                .delete(`https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${item.id}`)
                .then(() => {
                    notification.success({
                        message: 'Delete class successfully',
                    });
                    domChangeSuccess();
                })
                .catch(function (error) {
                    console.log(error);
                    notification.error({
                        message: 'Delete class failed',
                        description: 'Please try again!',
                    });
                });
        } else if (modalAction === 'changeStatus') {
            let nextStatus = ""
            if (item.status === "Planning") {
                nextStatus = "Opening"
            }
            else if (item.status === "Opening") {
                nextStatus = "Closed"
            }
            else if (item.status === "Closed") {
                nextStatus = "Opening"
            }
            axios
                .put(`https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${item.id}`, { status: nextStatus })
                .then(() => {
                    notification.success({
                        message: 'Status changed successfully',
                    });
                    domChangeSuccess();
                })
                .catch(function (error) {
                    console.log(error);
                    notification.error({
                        message: 'Status change failed',
                        description: 'Please try again!',
                    });
                });
        }

        setModalVisible(false);
    };

    return (
        <tr className={cx("tr")} onDoubleClick={() => handleDoubleClick(item)}>
            {/* <td className={cx("td", "id")}>{item.id}</td> */}
            <td className={cx("td", "name")}>{item.classNames}</td>
            <td className={cx("td")}>{item.classCode}</td>
            <td className={cx("td")}>{item.createdOn}</td>
            <td className={cx("td")}>{item.createdBy}</td>
            <td className={cx("td")}>{item.duration} days</td>
            <td className={cx("td")}><AttendeeStyle attendee={item.attendee} /></td>
            {/* <td className={cx("td")}>{item.status}</td> */}
            <td className={cx("td")}>{item.location}</td>
            <td className={cx("td")}>{item.fsu}</td>
            <td className={cx("td")}>
                <Popover
                    trigger="click"
                    placement="bottomRight"
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
                                style={{ ...style, color: 'red' }}
                                onClick={() => { handleAction('delete'); domChange() }}
                            >
                                <DeleteForeverIcon />
                                Delete class
                            </button>

                            <button
                                style={style}
                                onClick={() => { handleAction('changeStatus'); domChange(); }}
                            >
                                {item.status === 'Planning' || item.status === 'Closed' ? (
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
                        </>
                    }
                >
                    <Button className={cx('more-btn')} onClick={() => setOpen(!open)}>
                        <MoreIcon />
                    </Button>
                </Popover>

                <Modal
                    title={
                        modalAction === 'delete'
                            ? 'Confirm Deletion'
                            : modalAction === 'duplicate'
                                ? 'Confirm Duplication'
                                : 'Confirm Status Change'
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
                        style: { color: '#ff0000', border: 'none', textDecoration: 'underline' },
                    }}
                >
                    {modalAction === 'delete'
                        ? `Do you want to delete the "${item.classNames}" class? This action cannot be undone.`
                        : modalAction === 'duplicate'
                            ? `Do you want to duplicate the "${item.classNames}" class?`
                            : `Do you want to change the status of the "${item.classNames}" class to "${newStatus}"?`}
                </Modal>
            </td>
        </tr >
    );
}

export default TableRow;