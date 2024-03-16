import axiosClient from "./axios/config";
import { notification } from "antd";

export const getUserList = async () => {
    try {
        const response = await axiosClient.get("/api/user/view-user-list");
        return response;
    } catch (error) {
        notification.error({
            message: error?.message || "Something wrong! Please try again later.",
        });
    }
};

export const changeRole = async (data) => {
    try {
        const response = await axiosClient.put(`/api/user/grant-permission`, data);
        notification.success({
            message: "Change role successfully",
        });
        return response;
    } catch (error) {
        notification.error({
            message: "Change role failed",
            description: "Something wrong! Please try again later!"
        });
    }
};

export const changeStatus = async (id) => {
    try {
        const response = await axiosClient.put(`/api/user/active-deactive-user?id=${id}`);
        notification.success({
            message: "Change status successfully",
        });
        return response;
    } catch (error) {
        notification.error({
            message: "Change status failed",
            description: "Something wrong! Please try again later!"
        });
    }
};

export const addUser = async (finalData) => {
    try {
        const response = await axiosClient.post('/api/user/create-user', finalData);
        notification.success({
            message: "Add user successfully."
        });
        return response;
    } catch (error) {
        notification.error({
            message: "Add user failed.",
            description: "Something wrong! Please check all information and try again later."
        });
    }
}

export const editUser = async (finalData) => {
    try {
        const response = await axiosClient.put(`/api/user/update-user`, finalData);
        notification.success({
            message: "Edit user successfully!"
        });
        return response;
    } catch (error) {
        notification.error({
            message: "Edit user failed!",
            description: "Something wrong! Please check all information and try again later."
        });
    }
}

export const getUserPermission = async () => {
    try {
        const response = await axiosClient.get("/api/userpermission/view-user-permission");
        return response;
    } catch (error) {
        notification.error({
            message: error?.message || "Something wrong! Please try again later.",
        });
    }
}

export const updateUserPermission = async (newPermission1, newPermission2, newPermission3) => {
    try {
        const response1 = await axiosClient.put(`/api/userpermission/update-user-permission`, { ...newPermission1, userManagement: "Full access" });
        const response2 = await axiosClient.put(`/api/userpermission/update-user-permission`, { ...newPermission2, userManagement: "Create" });
        const response3 = await axiosClient.put(`/api/userpermission/update-user-permission`, { ...newPermission3, userManagement: "View" });
        if (response1.statusText === "OK" && response2.statusText === "OK" && response3.statusText === "OK") {
            notification.success({
                message: "Update permission successfully",
            })
        }
    } catch (error) {
        notification.error({
            message: "Update permission failed",
            description: "Something wrong! Please try again later."
        })
    }
}