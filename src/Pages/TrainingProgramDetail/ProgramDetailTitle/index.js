import styles from "./DetailTitle.module.scss";
import DetailDescription from "../ProgramDetailDescription";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import classNames from "classnames/bind";
import {
  MoreIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../../Components/Common/Icons/ActionIcons";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Popover, notification, Modal, Spin } from "antd";
import { LearningMaterialsIcon } from "../../../Components/Common/Icons/NavMenuIcons";
import {
  CopyIcon,
  CreateIcon,
  DeleteForeverIcon,
} from "../../../Components/Common/Icons/DocManageIcons";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DetailTitle({ itemId, domChange, domChangeSuccess }) {
  const [loading, setLoading] = useState(true);
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [programStatus, setProgramStatus] = useState("");
  const [programDuration, setProgramDuration] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [programAuthor, setProgramAuthor] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const cx = classNames.bind(styles);
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchProgramDetail() {
      try {
        const response = await axios.get(
          `https://65411666f0b8287df1fdc4fa.mockapi.io/program/${itemId}`
        );
        setProgramId(response.data.id);
        setProgramName(response.data.name);
        setProgramStatus(response.data.status);
        setProgramAuthor(response.data.createBy);
        setCreateDate(response.data.createOn);
        setProgramDuration(response.data.duration);
      } catch (error) {
        if (error.response) {
          // Kiểm tra mã trạng thái của phản hồi từ server
          if (error.response.status === 404) {
            // Id không tồn tại trong API
            console.error("Id not exist.");
            //Chuyển hướng người dùng đến trang 404
            {
              /*...*/
            }
          } else {
            // Xử lý các trường hợp lỗi khác
            console.error("Server error", error.response.status);
          }
        } else {
          // Xử lý lỗi khi không có phản hồi từ server
          console.error("Server not responding", error.request);
        }
      } finally {
        setLoading(false); // Đặt loading thành false khi đã tải xong dữ liệu (hoặc gặp lỗi)
      }
    }
    fetchProgramDetail();
  }, [itemId]);

  //***************************************************************************//

  const handleAction = (action) => {
    setModalAction(action);
    setNewStatus("");
    setModalVisible(true);
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`https://65411666f0b8287df1fdc4fa.mockapi.io/program/${itemId}`)
      .then(() => {
        notification.success({
          message: "Delete program successfully",
        });
        domChangeSuccess();
        navigate("/tranning-program-list");
      })
      .catch(function (error) {
        console.log(error);
        notification.error({
          message: "Delete program failed",
          description: "Please try again",
        });
      });
  };
  //******************************************************************************//
  const handleDuplicate = () => {
    const duplicatedProgram = {
      name: programName,
      createOn: createDate,
      status: programStatus,
      createBy: programAuthor,
      duration: programDuration,
    };
    delete duplicatedProgram.itemId;
    axios
      .post(
        "https://65411666f0b8287df1fdc4fa.mockapi.io/program/",
        duplicatedProgram
      )
      .then(() => {
        notification.success({
          message: "Duplicate program successfully",
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
  //******************************************************************************//

  const handleChangeStatus = () => {
    let nextStatus = "";
    if (programStatus === "Inactive") {
      nextStatus = "Active";
    } else if (programStatus === "Active") {
      nextStatus = "Inactive";
    }
    axios
      .put(`https://65411666f0b8287df1fdc4fa.mockapi.io/program/${itemId}`, {
        status: nextStatus,
      })
      .then(() => {
        setProgramStatus(nextStatus);
        setNewStatus(nextStatus);
        notification.success({
          message: "Status changed successfully",
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

  const performAction = () => {
    if (modalAction === "duplicate") {
      handleDuplicate();
    } else if (modalAction === "delete") {
      handleDelete();
    } else if (modalAction === "changeStatus") {
      handleChangeStatus();
    }
    setModalVisible(false);
  };

  //****************************************************************//

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ color: "#2D3748" }} size="larger" />}
    >
      <div className={cx("title-container")}>
        <div className={cx("title-1")}>
          <h4 className={cx("program-text")}>Training Program</h4>
        </div>

        <div className={cx("title-body")}>
          <div className={cx("title-2")}>
            <h3 className={cx("program-text")}>{programName}</h3>

            <div className={cx("program-status")}>
              <StatusChip title={programStatus} />
            </div>
          </div>

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
                    domChange();
                  }}
                >
                  <CopyIcon />
                  Duplicate program
                </button>

                <button
                  style={{
                    ...style,
                    display: programStatus !== "Draft" ? "inline-flex" : "none",
                  }}
                  onClick={() => {
                    if (programStatus !== "Draft") {
                      handleAction("changeStatus");
                      domChange();
                    }
                  }}
                >
                  {programStatus === "Active" && programStatus !== "Draft" ? (
                    <>
                      <VisibilityOffIcon />
                      De-activate
                    </>
                  ) : programStatus !== "Draft" ? (
                    <>
                      <VisibilityIcon />
                      Activate
                    </>
                  ) : null}
                </button>
                <button
                  style={{ ...style, color: "red" }}
                  onClick={() => {
                    handleAction("delete");
                    domChange();
                  }}
                >
                  <DeleteForeverIcon />
                  Delete program
                </button>
              </>
            }
          >
            <div
              className={cx("program-more-icon")}
              onClick={() => setOpen(!open)}
            >
              <MoreIcon />
            </div>
          </Popover>

          <Modal
            title={
              modalAction === "delete"
                ? "Delete program"
                : modalAction === "duplicate"
                ? "Duplicate program"
                : "Change Status program"
            }
            open={isModalVisible}
            onOk={performAction}
            onCancel={() => setModalVisible(false)}
            okText={
              modalAction === "delete"
                ? "Delete"
                : modalAction === "duplicate"
                ? "Duplicate"
                : "Change"
            }
            okButtonProps={{
              style: { backgroundColor: "#2D3748", color: "#fff" },
            }}
            cancelButtonProps={{
              style: { color: "#ff0000", border: "none" },
            }}
            centered={true}
          >
            {modalAction === "delete"
              ? `Do you want to delete the "${programName}" program? This action cannot be undone.`
              : modalAction === "duplicate"
              ? `Do you want to duplicate the "${programName}" program?`
              : `Do you want to change the status of the "${programName}" program?`}
          </Modal>
        </div>
        <div className={cx("description")}>
          <DetailDescription
            author={programAuthor}
            createDate={createDate}
            duration={programDuration}
          />
        </div>
      </div>
    </Spin>
  );
}

export default DetailTitle;
