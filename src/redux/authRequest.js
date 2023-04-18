import apiClient from "../http/http-common";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    // localStorage.setItem("accessToken", res.data.accessToken);
    dispatch(loginSuccess(res.data));
    navigate("/profile");
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await apiClient.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed(error.response.data));
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await apiClient.post("/auth/logout");
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};