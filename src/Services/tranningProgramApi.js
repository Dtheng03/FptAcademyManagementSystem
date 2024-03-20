import axiosClient from "./axios/config";
import { notification } from "antd";



export const getProgramList = async () => {

    try {
        const response = await axiosClient.get("/api/trainingprogram/view-training-program-list");
        return response;
    }

    catch (error) {
        notification.error({
            message: error?.message
        });
    }
}