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

export const getJoinGroup = async (token, tokenJoinGr) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/gr/join", {
      params: {
        token : tokenJoinGr,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user, dispatch, navigate, tokenJoinGr) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    // localStorage.setItem("accessToken", res.data.accessToken);
    dispatch(loginSuccess(res.data));
    
    if (tokenJoinGr) {
      const resJoin = await getJoinGroup(res.data.accessToken, tokenJoinGr);
      console.log(resJoin);
    }
    navigate("/");
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

export const loginGG = async (dispatch) => {
  try {
    const res = await apiClient.get("/auth/validate");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (token, dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await apiClient.post("/auth/logout", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};
