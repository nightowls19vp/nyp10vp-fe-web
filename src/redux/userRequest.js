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

export const updateInformationUser = async (userID, user, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user);
    dispatch(getUserInforSuccess(res.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const updateAvatarUser = async (userID, user, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}/avatar`, user);
    console.log(res.data);
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