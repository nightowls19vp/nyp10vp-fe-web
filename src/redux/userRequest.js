import apiClient from "../http/http-common.js";
import { setOrder } from "./authSlice.js";
import {
  getGroupSuperUser,
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
  updateGroupId,
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
    dispatch(getUserInforSuccess(res?.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const updateInformationUser = async (userID, token, user, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    
    await getInformationUser(userID, token, dispatch, axiosJWT);

    return res?.data;
  } catch (error) {
    console.log(error);
    dispatch(getUserInforFailed());
  }
};

export const uploadFile = async (id, token, file) => {
  try {
    const res = await apiClient.post("/file/upload-avatar", file, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatarUser = async (userID, token, data, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, data, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    await getInformationUser(userID, token, dispatch, axiosJWT);
    return res?.data;
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

export const updateSettingUser = async (userID, token, user, dispatch, axiosJWT) => {
  try {
    await axiosJWT.put(`/users/${userID}/setting`, user, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    await getInformationUser(userID, token, dispatch, axiosJWT)
  } catch (error) {
    console.log(error);
  }
};

export const userCheckout = async (token, dispatch, user, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/users/checkout", user, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res?.data);
    dispatch(setOrder(res?.data));
    return res?.data;
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

    let dataGroup = [
      {
        title: "Group SUPER USER",
        status: true,
        child: [],
      },
      {
        title: "Group USER",
        status: false,
        child: [],
      },
    ];

    console.log(res?.data);

    for (let item of res?.data.groups) {
      dataGroup[0].child.push(item);
    }

    dispatch(getGroupSuperUser(dataGroup));

    console.log(dataGroup);
    
    dispatch(updateGroupId(dataGroup[0].child[0]._id))
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

export const usersInvitePeople = async (token, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/pkg-mgmt/gr/inv", data, {
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

export const uploadAvatarGroup = async (id, token, file, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/file/upload-gr-avatar/${id}`, file, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatarGroup = async (id, token, file, dispatch, axiosJWT) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${id}/avatar`, file, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
      },
    })
    
    await getGroupByUserId(token, "Super User", dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupName = async (id, token, name, dispatch, axiosJWT) => {
  try {
    await axiosJWT.put(`/pkg-mgmt/gr/${id}`, name, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
      },
    })

    await getGroupByUserId(token, "Super User", dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const updateActivatePackage = async (id, token, data, dispatch, axiosJWT) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${id}/activate`, data, {
      headers: {
        'accept': '*/*',
        Authorization: `Bearer ${token}`,
      },
    })

    await getGroupByUserId(token, "Super User", dispatch, axiosJWT);

    dispatch(updateGroupId(id));
  } catch (error) {
    console.log(error);
  }
};

export const userRenewGroup = async (grId, token, dispatch, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/renew/${grId}`, data, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setOrder(res?.data));
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};