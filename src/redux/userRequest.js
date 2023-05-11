import apiClient from "../http/http-common.js";
import {
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
} from "./userSlice";

export const getInformationUser = async (userID, dispatch, axiosJWT) => {
  dispatch(getUserInforStart());
  try {
    const res = await axiosJWT.get(`/users/${userID}`);
    dispatch(getUserInforSuccess(res.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const updateInformationUser = async (
  userID,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user);
    dispatch(getUserInforSuccess(res.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const uploadFile = async (token, file) => {
  try {
    console.log(token);
    const res = await apiClient.post("/file/upload-and-get-url", file, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatarUser = async (userID, user, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, user);
    return res.data;
    // dispatch(getUserInforSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getSettingUser = async (userID) => {
  try {
    const res = await apiClient.get(`/users/${userID}/setting`);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSettingUser = async (userID, user) => {
  try {
    const res = await apiClient.put(`/users/${userID}/setting`, user);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
