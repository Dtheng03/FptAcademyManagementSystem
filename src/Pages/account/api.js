import axios from "axios";

const API_BASE_URL =
  "https://659e636d47ae28b0bd35b522.mockapi.io/cosmetic_shop";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(API_BASE_URL);

    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    return user;
  } catch (error) {
    throw error;
  }
};
