import apiClient from "../http/http-common.js";
import { setOrder } from "./authSlice.js";
import * as SB from "../component/Chat/SendBirdGroupChat.js";
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
    const resSU_group = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: 'name;avatar;packages;members;billing',
        role: "Super User",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const resU_group = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: 'name;avatar;packages;members;billing',
        role: "User",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (resSU_group?.data.groups.length > 0 || resU_group?.data.groups.length > 0) {
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

      if (resSU_group?.data.groups.length > 0 && resU_group?.data.groups.length > 0) {
        for (let item of resSU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
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
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            packages: packages,
            members: item.members
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: itemSpending,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[0].child.push(formData);
        }
        dataGroup[0].child[0].status = true;
        dispatch(updateGroupId(dataGroup[0].child[0]._id));

        for (let item of resU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
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
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            packages: packages,
            members: item.members
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: itemSpending,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[1].child.push(formData);
        }
      } else if (
        resSU_group?.data.groups.length > 0 &&
        resU_group?.data.groups.length === 0
      ) {
        for (let item of resSU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
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
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            packages: packages,
            members: item.members
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: itemSpending,
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
        for (let item of resU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
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
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            packages: packages,
            members: item.members
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing
          }

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              check: false,
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý chi tiêu",
              check: false,
              group: itemSpending,
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
  channel,
  userID,
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

    // await SB.connectSendBird(userID);

    // await SB.updateAvatarChannel(channel, file.file);
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupName = async (
  id,
  token,
  channel,
  userID,
  name,
  dispatch,
  axiosJWT
) => {
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

export const getGroupChannel = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user_id/channel", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res?.data.channels);
    dispatch(getChannels(res?.data.channels));
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

export const postPackageBill = async (group_id, data, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/bill/${group_id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
     await getGroupByUserId(token, dispatch, axiosJWT);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};