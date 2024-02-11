import styles from "./TableRow.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MoreIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { FemaleIcon, MaleIcon, RoleIcon } from "../../../Components/Common/Icons/OtherIcons";
import { DeleteForeverIcon, CreateIcon } from "../../../Components/Common/Icons/DocManageIcons"
import StatusChip from "../../../Components/Common/Status/StatusChip";
import { Popover } from 'antd';
import { useDispatch } from "react-redux";
import { setUpdateUser } from "../../../Redux/Reducer/UserSlice";

const cx = classNames.bind(styles);

function TableRow({ item, openEdit }) {
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

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    return (
        <tr className={cx("tr")}>
            <td className={cx("td", "id")}>{item.id}</td>
            <td className={cx("td", "name")}>{item.name}</td>
            <td className={cx("td")}>{item.email}</td>
            <td className={cx("td")}>{item.dob}</td>
            <td className={cx("td")}>{item.gender ? <MaleIcon /> : <FemaleIcon />}</td>
            <td className={cx("td")}><StatusChip title={item.role ? "Admin" : "Trainer"} /></td>
            <td className={cx("td")}>
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
                                trigger="hover"
                                placement="left"
                                content={
                                    <>
                                        <button style={{ ...style, width: "100px" }}>
                                            Super Admin
                                        </button>
                                        <button style={{ ...style, width: "100px" }}>
                                            Class Admin
                                        </button>
                                        <button style={{ ...style, width: "100px" }}>
                                            Trainer
                                        </button>
                                    </>
                                }
                            >
                                <button style={style}>
                                    <RoleIcon />
                                    Change role
                                </button>
                            </Popover>
                            {item.status ?
                                <button style={style}>
                                    <VisibilityOffIcon />
                                    De-activate user
                                </button> :
                                <button style={style}>
                                    <VisibilityIcon />
                                    Activate user
                                </button>
                            }
                            <button style={{ ...style, color: "red" }}>
                                <DeleteForeverIcon />
                                Delete user
                            </button>
                        </>
                    }
                >
                    <button
                        className={cx("more-btn")}
                        onClick={() => { setOpen(!open) }}
                    >
                        <MoreIcon />
                    </button>
                </Popover>
            </td>
        </tr >
    );
}

export default TableRow;