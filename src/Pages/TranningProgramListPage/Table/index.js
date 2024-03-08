import React, { useState } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import {  Popover, notification, Modal } from "antd";
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
import { useNavigate } from "react-router";

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

export default function Table({ item, domChange, domChangeSuccess,reload }) {
  const link = useNavigate();

  const handleViewDetail = (selectedItem) => {
    link(`/view-tranning-program-detail/${selectedItem.id}`);
  };

  const style = {
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "12%",
    width: "180px",
    height: "40px",
    fontWeight: "bold",
    color: "#4F6181",
    cursor: "pointer",
  };
  const [open, setOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(item.status);
  const [modalAction, setModalAction] = useState("");

  const handleAction = (action) => {
    setModalAction(action);
    setNewStatus("");
    setIsModalVisible(true);
    setOpen(false);
  };

  const performAction = () => {
    if (modalAction === "duplicate") {
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
        reload();
    } else if (modalAction === "delete") {
      axios
        .delete(
          `https://65411666f0b8287df1fdc4fa.mockapi.io/program/${item.id}`
        )
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
        reload();
    } else if (modalAction === "changeStatus") {
      let nextStatus = "";
      if (item.status === "Inactive") {
        nextStatus = "Active";
      } else if (item.status === "Active") {
        nextStatus = "Inactive";
      } 
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
        reload();

    }
    setIsModalVisible(false);
  };

  // const handleDelete = () => {};

  // const handleDuplicate = () => {};

  return (
    <tr className={cx("tr")} onDoubleClick={() => handleViewDetail(item)}>
      <td className={cx("td", "id")}>{item.id}</td>
      <td className={cx("td", "name")}>{item.name}</td>
      <td className={cx("td", "createOn")}>{item.createOn}</td>
      <td className={cx("td","createBy")}>{item.createBy}</td>
      <td className={cx("td","duration")}>{item.duration} days</td>
      <td className={cx("td","style")}>
        <StatusStyle  status={item.status} />
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
                  setOpen(false);
                }}
              >
                <LearningMaterialsIcon />
                Tranning materials
              </button>

              <button
                style={style}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CreateIcon />
                Edit program
              </button>

              <button
                style={style}
                onClick={() => {
                  handleAction("duplicate");
                  setOpen(false);
                  domChange();
                }}
              >
                <CopyIcon />
                Duplicate program
              </button>

              <button
                style={style}
                onClick={() => {
                  handleAction("changeStatus");
                  domChange();
                }}
              >
                {item.status === "Inactive" ? (
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

              <button
                style={{ ...style, color: "red" }}
                onClick={() => {
                  handleAction("delete");
                  setOpen(false);
                  domChange();
                }}
              >
                <DeleteForeverIcon />
                Delete program
              </button>
            </>
          }
        >
          <button className={cx("more-btn")} onClick={() => setOpen(!open)}>
            <MoreIcon />
          </button>
        </Popover>

        <Modal
          title={
            modalAction === "delete"
              ? "Delete Confirm"
              : modalAction === "duplicate"
              ? "Duplicate Confirm"

              : "Change Status Confirm"
          }
          open={isModalVisible}
          onOk={performAction}
          onCancel={() => setIsModalVisible(false)}
          okText={
            modalAction === "delete"
              ? "Delete"
              : modalAction === "duplicate"
              ? "Duplicate"
              : "Change status"
          }
          okButtonProps={{ style: { backgroundColor: "#C70039" } }}
          cancelButtonProps={{ style: { color: "#C70039", border: "none" } }}
        >
          {modalAction === "delete"
            ? `Do you want to delete the "${item.name}" ? This process cannot be restored!!`
            : modalAction === "duplicate"
            ? `Do you want to duplicate the "${item.name}" ?`
            : `Do you want to change the status of the "${item.name}" class to "${newStatus}"?`}
        </Modal>
      </td>
    </tr>
  );
}
