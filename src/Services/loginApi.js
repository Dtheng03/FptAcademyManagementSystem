import axiosClient from "./axios/config";

export const loginUser = async (email, password) => {
    try {
        const response = await axiosClient.post("/api/authorize/login", {
            email: email,
            password: password,
        });
        const responseData = response.data;

        if (responseData.isSuccess) {
            const user = responseData.data.loginResModel;
            const token = responseData.data.token;
            sessionStorage.setItem("token", token);

            return { user };
        } else {
            throw new Error(responseData.message || "Login failed");
        }
    } catch (error) {
        throw error;
    }
};