// // api.js
// import axios from "axios";

// const API_BASE_URL = "https://659e636d47ae28b0bd35b522.mockapi.io/cosmetic_shop";

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.js
import axios from "axios";

const API_BASE_URL =
  "https://659e636d47ae28b0bd35b522.mockapi.io/cosmetic_shop";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(API_BASE_URL);

    const user = response.data.find(
      (user) => user.userName === username && user.password === password
    );

    return user;
  } catch (error) {
    throw error;
  }
};
