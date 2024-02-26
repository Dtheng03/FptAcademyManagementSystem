import axios from "axios";

const API_BASE_URL = "http://fams-group1-net03.ptbiology.com/api/authorize/login";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      email: email,
      password: password,
    });

    const responseData = response.data;

    if (responseData.isSuccess) {
      const user = responseData.data.userResModel;
      const token = responseData.data.token;
      sessionStorage.setItem("token", token);

      return { user, token };
    } else {
      throw new Error(responseData.message || "Login failed");
    }
  } catch (error) {
    throw error;
  }
};
