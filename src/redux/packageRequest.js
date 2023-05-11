import apiClient from "../http/http-common.js";

// import dataPackage from "../data/dataPackage.js";
import { setInitialPackage, updatePackageId } from "./packageSlice.js";

export const getAllPackage = async (dispatch) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/pkg");

    let dataPackage = [
      {
        title: "CÁC GÓI NGƯỜI DÙNG",
        status: true,
        child: [],
      },
      {
        title: "CÁC TIỆN ÍCH",
        status: false,
        child: [],
      },
    ];

    for (let item of res.data.data) {
      dataPackage[0].child.push(item);
    }

    dispatch(setInitialPackage(dataPackage));

    dispatch(updatePackageId(dataPackage[0].child[0]._id));

  } catch (error) {
    console.log(error);
  }
};

export const getDetailPackage = async (pakageID) => {
  try {
    const res = await apiClient.get(`/pkg-mgmt/pkg/${pakageID}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = async (userID, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/users/${userID}/cart`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};