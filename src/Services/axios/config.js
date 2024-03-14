import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://fams-group1-net03.ptbiology.com',
    headers: {
        "Content-type": "application/json",
    },

});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json";
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;