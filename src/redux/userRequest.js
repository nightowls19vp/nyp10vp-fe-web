import apiClient from "../http/http-common";
import {
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
} from "./userSlice";

export const getInformationUser = async (userID, dispatch) => {
  dispatch(getUserInforStart());
  try {
    const res = await apiClient.get(`/users/${userID}`);
    dispatch(getUserInforSuccess(res));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};
