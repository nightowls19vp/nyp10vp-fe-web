import apiClient from "../http/http-common.js";
import { setOrder } from "./authSlice.js";
import {
  getGroupAll,
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
  getChannels,
  updateGroupId,
  updateGroupItemId,
} from "./userSlice";

export const getInformationUser = async (userID, token, dispatch, axiosJWT) => {
  dispatch(getUserInforStart());
  try {
    const res = await axiosJWT.get(`/users/${userID}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserInforSuccess(res?.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const updateInformationUser = async (
  userID,
  token,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user, {
      headers: {
        accept: "*/*",
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
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatarUser = async (
  userID,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, data, {
      headers: {
        accept: "*/*",
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

export const updateSettingUser = async (
  userID,
  token,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.put(`/users/${userID}/setting`, user, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getInformationUser(userID, token, dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const userCheckout = async (token, dispatch, user, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/users/checkout", user, {
      headers: {
        accept: "*/*",
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

export const getGroupByUserId = async (token, dispatch, axiosJWT) => {
  try {
    const resSU = await axiosJWT.get("/pkg-mgmt/gr/user_id", {
      params: {
        role: "Super User",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const resU = await axiosJWT.get("/pkg-mgmt/gr/user_id", {
      params: {
        role: "User",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    

    if (resSU?.data.groups.length > 0 || resU?.data.groups.length > 0) {
      let dataGroup = [
        {
          name: "Group SUPER USER",
          _id: 0,
          check: true,
          status: true,
          child: [],
        },
        {
          name: "Group USER",
          _id: 1,
          check: true,
          status: false,
          child: [],
        },
      ];

      if (resSU?.data.groups.length > 0 && resU?.data.groups.length > 0) {
        for (let item of resSU?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0])
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages
          }

          item = {
            ...item,
            packages: packages
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: item,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: item,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[0].child.push(formData);
        }
        dataGroup[0].child[0].status = true;
        dispatch(updateGroupId(dataGroup[0].child[0]._id));

        for (let item of resU?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0])
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages
          }

          item = {
            ...item,
            packages: packages
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: item,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: item,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[1].child.push(formData);
        }
      } else if (
        resSU?.data.groups.length > 0 &&
        resU?.data.groups.length === 0
      ) {
        for (let item of resSU?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0])
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages
          }

          item = {
            ...item,
            packages: packages
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: item,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: item,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[0].child.push(formData);
        }
        dataGroup[0].child[0].status = true;
        dispatch(updateGroupId(dataGroup[0].child[0]._id));
      } else {
        dataGroup[0].status = false;
        dataGroup[1].status = true;
        for (let item of resU?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0])
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages
          }

          item = {
            ...item,
            packages: packages
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: item,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: item,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[1].child.push(formData);
        }
        dataGroup[1].child[0].status = true;
        dispatch(updateGroupId(dataGroup[1].child[0]._id));
      }

      dispatch(getGroupAll(dataGroup));
      dispatch(updateGroupItemId(0));

    } else {
      dispatch(updateGroupId(0));
      dispatch(getGroupAll([]));
      dispatch(updateGroupItemId(0));
    }
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
    return res?.data;
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
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatarGroup = async (
  id,
  token,
  file,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${id}/avatar`, file, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, "Super User", dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupName = async (id, token, name, dispatch, axiosJWT) => {
  try {
    await axiosJWT.put(`/pkg-mgmt/gr/${id}`, name, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const updateActivatePackage = async (
  id,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/gr/${id}/activate`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);

    dispatch(updateGroupId(id));
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const userRenewGroup = async (grId, token, dispatch, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/renew/${grId}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setOrder(res?.data));
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupChannel = async (
  grId,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${grId}/channel`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);

    await getGroupChannel(token, dispatch, axiosJWT);
  } catch (error) {
    console.log(error);
  }
};

export const getGroupChannel = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user_id/channel", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getChannels(res?.data.channels));
  } catch (error) {
    console.log(error);
  }
};
