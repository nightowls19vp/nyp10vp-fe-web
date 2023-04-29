import apiClient from "../http/http-common";
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
    const res = await axiosJWT.get(`/users/${userID}`, user);
    dispatch(getUserInforSuccess(res.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};
