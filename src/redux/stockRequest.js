import { updateListProduct, updateListStock, updateMetaListProduct } from "./stockSlide";

export const getStorageLocation = async (
  groupId,
  token,
  dispatch,
  axiosJWT
) => {
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

    dispatch(updateListStock(res?.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const postStorageLocation = async (data, token, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/prod-mgmt/storage-locations", data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res?.data);
  } catch (error) {
    console.log(error);
  }
};

export const getProductItems = async (
  grId,
  currentPage,
  limit,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.get("/prod-mgmt/items", {
      params: {
        groupId: grId,
        page: currentPage,
        limit: limit,
        "filter.timestamp.deletedAt": "$null",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res?.data);
    dispatch(updateListProduct(res?.data.data));
    dispatch(updateMetaListProduct(res?.data.meta));
  } catch (error) {
    console.log(error);
  }
};

export const getGroupProducts = async (
  groupId,
  currentPage,
  limit,
  token,
  dispatch,
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
    console.log(error);
  }
};
