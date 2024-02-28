import React, { useState } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { Popconfirm, Popover, notification, Button } from "antd";
import { LearningMaterialsIcon } from "../../../Components/Common/Icons/NavMenuIcons";
import {
  CopyIcon,
  CreateIcon,
  DeleteForeverIcon,
} from "../../../Components/Common/Icons/DocManageIcons";
import {
  MoreIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../../Components/Common/Icons/ActionIcons";
import axios from "axios";

const cx = classNames.bind(styles);

function StatusStyle({ status }) {
  var className, title;
  if (status === "Active") {
    className = "active";
    title = "Active";
  } else if (status === "Inactive") {
    className = "inactive";
    title = "Inactive";
  } else if (status === "Draft") {
    className = "draft";
    title = "Draft";
  }

  return <span className={cx("status-style", className)}>{title}</span>;
}

export default function Table({ item, domChange, domChangeSuccess }) {
  const style = {
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
  };
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(item.status);

  const handleDelete = () => {
    axios
      .delete(`https://65411666f0b8287df1fdc4fa.mockapi.io/program/${item.id}`)
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
          description: "Please try again",
        });
      });
  };

  const handleChangeStatus = () => {
    const nextStatus = newStatus === "Active" ? "Inactive" : "Active";
    axios
      .put(`https://65411666f0b8287df1fdc4fa.mockapi.io/program/${item.id}`, {
        status: nextStatus,
      })
      .then(() => {
        notification.success({
          message: "Status updated successfully",
        });
        domChangeSuccess();
      })
      .catch(function (error) {
        console.log(error);
        notification.error({
          message: "Status update failed",
          description: "Try Again!",
        });
      });
  };

  const handleDuplicate = () => {
    const duplicatedProgram = { ...item };
    delete duplicatedProgram.id;
    axios
      .post(
        "https://65411666f0b8287df1fdc4fa.mockapi.io/program",
        duplicatedProgram
      )
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
          description: "Please try again",
        });
      });
  };

  return (
    <tr className={cx("tr")}>
      <td className={cx("td")}>{item.id}</td>
      <td className={cx("td")}>{item.name}</td>
      <td className={cx("td")}>{item.createOn}</td>
      <td className={cx("td")}>{item.createBy}</td>
      <td className={cx("td")}>{item.duration}</td>
      <td className={cx("td")}>
        <StatusStyle status={item.status} />
      </td>
      <td className={cx("td")}>
        <Popover
          trigger="click"
          placement="bottom"
          open={open}
          onOpenChange={() => {
            setOpen(!open);
          }}
          content={
            <>
              <button
                style={style}
                onClick={() => {
                  setOpen = false;
                }}
              >
                <LearningMaterialsIcon />
                Tranning materials
              </button>

              <button
                style={style}
                onClick={() => {
                  setOpen = false;
                }}
              >
                <CreateIcon />
                Edit program
              </button>

              <button
                style={style}
                onClick={() => {
                  handleDuplicate();
                  setOpen(false);
                  domChange();
                }}
              >
                <CopyIcon />
                Duplicate program
              </button>

              <Popconfirm
                trigger={"click"}
                title="Delete program"
                description={
                  <div>
                    {`Do you want to delete the "${item.programName}" `}
                    <br />
                    {"This program cannot be restored!"}
                  </div>
                }
                placement="left"
                onConfirm={handleDelete}
                okText="Delete"
                okButtonProps={{
                  style: { backgroundColor: "#2D3748", color: "#FFF" },
                }}
                cancelButtonProps={{
                  style: { color: "#ff0000", border: "none" },
                }}
              >
                <button
                  style={{ ...style, color: "red" }}
                  onClick={() => domChange()}
                >
                  <DeleteForeverIcon />
                  Delete Program
                </button>
              </Popconfirm>

              <Popconfirm
                trigger="click"
                title="Change Status"
                description={`Are you sure you want to change the status to ${
                  newStatus === "Active" ? "Inactive" : "Active"
                }?`}
                placement="left"
                onConfirm={handleChangeStatus}
                okText="Yes"
                cancelText="No"
              >
                {newStatus === "Active" ? (
                  <Button style={style} onClick={() => domChange()}>
                    <VisibilityOffIcon />
                    Deactivate
                  </Button>
                ) : (
                  <Button style={style} onClick={() => domChange()}>
                    <VisibilityIcon />
                    Activate
                  </Button>
                )}
              </Popconfirm>
            </>
          }
        >
          <button className={cx("more-btn")} onClick={() => setOpen(!open)}>
            <MoreIcon />
          </button>
        </Popover>
      </td>
    </tr>
  );
}
