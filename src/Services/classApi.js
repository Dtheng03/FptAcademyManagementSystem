import axiosClient from "./axios/config";
import { notification } from "antd";

export const getClassList = async () => {
    try {
        const response = await axiosClient.get("/api/class/view-class-list");
        // console.log(response);
        return response;
    }
    catch (error) {
        notification.error({
            message: error?.message
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

export const getLocationList = async () => {
    try {
        const response = await axiosClient.get("/api/class/view-location-list");
        // console.log(response);
        return response;
    }
    catch (error) {
        notification.error({
            message: error?.message
        });
    }
}

export const viewClassDetail = async (id) => {
    try {
        const response =await axiosClient.get(`/api/class/view-details-class?classId=${id}`);
        // console.log(response);
        return response;
    }
    catch (error) {
        notification.error({
            message: error?.message
        })
    }
}