import apiClient from "../http/http-common.js";
import { setOrder } from "./authSlice.js";
import {
  getGroupSuperUser,
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
} from "./userSlice";

export const getInformationUser = async (userID, token, dispatch, axiosJWT) => {
  dispatch(getUserInforStart());
  try {
    const res = await axiosJWT.get(`/users/${userID}`, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
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

export const uploadFile = async (id, token, file) => {
  try {
    const res = await apiClient.post(`/file/${id}/upload-avatar`, file, {
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

export const updateAvatarUser = async (userID, token, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, data, {
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

export const userCheckout = async (userID, token, dispatch, user, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/checkout`, user, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res?.data.order);
    dispatch(setOrder(res?.data.order))
  } catch (error) {
    console.log(error);
  }
};

export const getGroupByUserId = async (token, role, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user_id", {
      params: {
        role: role
      }, 
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(res?.data.groups);
    
    dispatch(getGroupSuperUser(res?.data.groups));
  } catch (error) {
    console.log(error);
  }
};

export const usersSearch = async (token, search, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/users/search", {
      params: {
        keyword: search,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return(res?.data);
  } catch (error) {
    console.log(error);
  }
};

export const usersInvitePeople = async (token, grId, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/inv", {
      params: {
        grId: grId,
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