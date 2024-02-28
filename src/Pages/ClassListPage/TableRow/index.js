import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon } from "../../../Components/Common/Icons/ActionIcons";
import { DeleteForeverIcon, CreateIcon, CopyIcon } from "../../../Components/Common/Icons/DocManageIcons";
import { Popover, notification, Popconfirm } from 'antd';
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

    const navigate = useNavigate();

    const handleDoubleClick = (selectedItem) => {
        navigate(`/view-class-detail/${selectedItem.id}`);
    };

    const handleDuplicateClass = () => {
        const duplicatedClass = { ...item };
        delete duplicatedClass.id;
        axios
            .post("https://653d1d13f52310ee6a99e3b7.mockapi.io/class", duplicatedClass)
            .then(() => {
                notification.success({
                    message: "Duplicate class successfully",
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: "Duplicate class failed",
                    description: "Please try again!",
                });
            });
    };

    const handleDeleteClass = () => {
        axios
            .delete(`https://653d1d13f52310ee6a99e3b7.mockapi.io/class/${item.id}`)
            .then(() => {
                notification.success({
                    message: "Delete class successfully",
                });
                domChangeSuccess();
            })
            .catch(function (error) {
                console.log(error);
                notification.error({
                    message: "Delete class failed",
                    description: "Please try again!",
                });
            });
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
            <td className={cx("td")}>{item.location}</td>
            <td className={cx("td")}>{item.fsu}</td>
            <td className={cx("td")}>
                <Popover
                    trigger="click"
                    placement="left"
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
                                onClick={() => {
                                    handleDuplicateClass();
                                    setOpen(false);
                                    domChange();

                                }}
                            >
                                <CopyIcon />
                                Duplicate class
                            </button>

                            <Popconfirm
                                trigger={"click"}
                                title="Delete class"
                                description={
                                    <div>
                                        {`Do you want to delete the "${item.classNames}" class?`}
                                        <br />
                                        {"This class cannot be restored."}
                                    </div>
                                }
                                placement="left"
                                onConfirm={handleDeleteClass}
                                okText="Delete"
                                okButtonProps={{ style: { backgroundColor: '#2D3748', color: '#fff' } }}
                                cancelButtonProps={{ style: { color: '#ff0000', border: 'none', textDecoration: 'underline' } }}
                            >
                                <button
                                    style={{ ...style, color: "red" }}
                                    onClick={() => domChange()}
                                >
                                    <DeleteForeverIcon />
                                    Delete class
                                </button>
                            </Popconfirm>
                        </>
                    }
                >
                    <button className={cx("more-btn")} onClick={() => setOpen(!open)}>
                        <MoreIcon />
                    </button>
                </Popover>
            </td>
        </tr >
    );
}

export default TableRow;
