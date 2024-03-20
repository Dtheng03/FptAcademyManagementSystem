import axiosClient from "./axios/config";
import { notification } from "antd";

export const getClassList = async () => {
    try {
        const response = await axiosClient.get("/api/class/view-class-list");
        return response;
    }
    catch (error) {
        notification.error({
            message: error ?.message
        });
    }
}

export const changeStatus = async (id) => {
    try {
        const response = await axiosClient.put(`/api/class/deactive-class?id=${id}`);
        notification.success({
            message: "Change class's status successfully",
        });
        return response;
    }
    catch (error) {
        notification.error({
            message: "Change class's status failed",
            description: "Please try again later!"
        });
    }
}