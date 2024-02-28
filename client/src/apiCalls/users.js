import { axiosInstance } from ".";

//const { axiosInstance } = require(".");

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/register", payload); // payload will be  req.body
    return response.data;
  } catch (error) {
    return error;
  }
};

// for log in

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/login", payload); // payload will be  req.body
    return response.data;
  } catch (error) {
    return error;
  }
};

// get current User

export const GetCurrentUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/get-current-user", payload);  // payload will be  req.body
    return response.data;
  }
  catch (error) {
    return error
  }
};
