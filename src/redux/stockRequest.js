import apiClient from "../http/http-common";
import {
  setIdOfStock,
  updateListProduct,
  updateListStock,
  updateMetaListProduct,
  updateProductItem,
  updateSidebarStock,
} from "./stockSlide";

export const getStorageLocation = async (groupId, token, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/storage-locations/${groupId}`, {
      params: {
        page: 1,
        limit: 20,
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch(updateListStock(res?.data.data));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroupActivedByUserId = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "name;packages",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    let formData = [];

    for (let item of res?.data.groups) {
      if (item.packages[0].status === "Active") {
        const stock = await getStorageLocation(item._id, token, axiosJWT);
        let data = {
          _id: item._id,
          name: item.name,
          stocks: stock,
        };
        formData.push(data);
      }
    }

    dispatch(updateSidebarStock(formData));
    if (formData.length > 0) {
      dispatch(setIdOfStock(formData[0]._id));
    }
  } catch (error) {
    return error.response.data;
  }
};

export const postStorageLocation = async (
  grID,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post("/prod-mgmt/storage-locations", data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    await getGroupActivedByUserId(token, dispatch, axiosJWT);
    dispatch(setIdOfStock(grID));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateStorageLocation = async (
  groupId,
  id,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(
      `/prod-mgmt/storage-locations/${groupId}/${id}`,
      data,
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await getGroupActivedByUserId(token, dispatch, axiosJWT);
    dispatch(setIdOfStock(groupId));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletedStorageLocation = async (
  groupId,
  id,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.delete(
      `/prod-mgmt/storage-locations/${groupId}/${id}`,
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await getGroupActivedByUserId(token, dispatch, axiosJWT);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductItemsByStorage = async (
  groupId,
  currentPage,
  limit,
  storageID,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/items/${groupId}`, {
      params: {
        page: currentPage,
        limit: limit,
        "filter.timestamp.deletedAt": "$null",
        "filter.storageLocation.id": storageID,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updateListProduct(res?.data.data));
    dispatch(updateMetaListProduct(res?.data.meta));
  } catch (error) {
    return error.response.data;
  }
};

export const getGroupProducts = async (
  groupId,
  currentPage,
  limit,
  token,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/group-products/${groupId}`, {
      params: {
        page: currentPage,
        limit: limit,
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchGroupProducts = async (search, groupId, token, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/group-products/${groupId}`, {
      params: {
        search: search,
        searchBy: "name",
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductItemById = async (
  groupId,
  id,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/items/${groupId}/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(updateProductItem(res?.data.data));
  } catch (error) {
    return error.response.data;
  }
};

export const searchPurchaseLocations = async (
  search,
  groupId,
  token,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/purchase-locations/${groupId}`, {
      params: {
        search: search,
        searchBy: [
          "address.provinceName",
          "address.districtName",
          "address.wardName",
          "address.addressLine1",
          "name",
        ],
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addItemsToStorage = async (grId, storageId, data, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/prod-mgmt/items", data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getProductItemsByStorage(grId, 1, 5, storageId, token, dispatch, axiosJWT);
    
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchProvinceVietNam = async (search, token) => {
  try {
    const res = await apiClient.get("/p", {
      params: {
        p: search,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchDistrictVietNam = async (search, pCode, token) => {
  try {
    const res = await apiClient.get("/d", {
      params: {
        q: search,
        p: pCode,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchWarVietNam = async (search, dCode, token) => {
  try {
    const res = await apiClient.get("/w", {
      params: {
        q: search,
        d: dCode,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchStorageLocation = async (
  groupId,
  search,
  token,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get(`/prod-mgmt/storage-locations/${groupId}`, {
      params: {
        search: search,
        searchBy: "name",
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addPurchaseLocations = async (data, token, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/prod-mgmt/purchase-locations", data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
