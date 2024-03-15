import React, { useState } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { Popover, notification, Modal } from "antd";
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
import crypto from "crypto-js";

const cx = classNames.bind(styles);

function StatusStyle({ status }) {
  var className, title;
  if (status === "Active") {
    className = "active";
    title = "Active";
  } else if (status === "Inactive") {
    className = "inactive";
    title = "Inactive";
  } else if (status === "Drafting") {
    className = "drafting";
    title = "Drafting";
  }

  return <span className={cx("status-style", className)}>{title}</span>;
}

export default function Table({ item, domChange, domChangeSuccess, reload }) {
  const link = useNavigate();

  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  var decryptedRoleName;
  const encryptedRoleName = sessionStorage.getItem("roleName");
  if (encryptedRoleName) {
    decryptedRoleName = crypto.AES.decrypt(
      encryptedRoleName,
      "react02"
    ).toString(crypto.enc.Utf8);
  }
  const roleName = decryptedRoleName;

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
          `http://fams-group1-net03.ptbiology.com/api/trainingprogram/dupplicate-training-program?id=${item.id}`,
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
          `http://fams-group1-net03.ptbiology.com/api/trainingprogram/view-training-program-list?id=${item.id}`
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
      <td className={cx("td", "id")}>{item.tpCode}</td>
      <td className={cx("td", "name")}>{item.tpName}</td>
      <td className={cx("td", "createOn")}>{item.createdDate}</td>
      <td className={cx("td", "createBy")}>{item.createdBy.fullName}</td>
      <td className={cx("td", "duration")}>{item.duration.hour} hour</td>
      <td className={cx("td", "style")}>
        <StatusStyle status={item.status} />
      </td>
      {(roleName === "Super Admin" || roleName === "Admin") && (
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
                  style={{
                    ...style,
                    display: item.status !== "Draft" ? "inline-flex" : "none",
                  }}
                  onClick={() => {
                    if (item.status !== "Draft") {
                      handleAction("changeStatus");
                      domChange();
                    }
                  }}
                >
                  {item.status === "Inactive" && item.status !== "Draft" ? (
                    <>
                      <VisibilityIcon />
                      Activate
                    </>
                  ) : item.status !== "Draft" ? (
                    <>
                      <VisibilityOffIcon />
                      De-activate
                    </>
                  ) : null}
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
              ? `Do you want to delete the "${item.tpName}" ? This process cannot be restored!!`
              : modalAction === "duplicate"
              ? `Do you want to duplicate the "${item.tpName}" ?`
              : `Do you want to change the status of the "${item.tpName}" class to "${newStatus}"?`}
          </Modal>
        </td>
      )}
    </tr>
  );
}
