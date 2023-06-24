import apiClient from "../http/http-common.js";

// import dataPackage from "../data/dataPackage.js";
import { setCarts, setInitialPackage, updateNotiPackage, updateNumberCart, updatePackageId } from "./packageSlice.js";

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

    let formNoti = {
      statusNoti: 0,
      msgNoti: ""
    }
    
    dispatch(updateNotiPackage(formNoti));

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

export const getUserCart = async (userID, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/users/${userID}/cart`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res?.data.cart);
    
    dispatch(setCarts(res?.data.cart));
    
    dispatch(updateNumberCart(res?.data.cart.length));

  } catch (error) {
    console.log(error);
  }
};

export const updateUserCart = async (userID, cart, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}/cart`, cart, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        
      },
    });
    
    // dispatch(setCarts(res?.data.cart));

    // dispatch(updateNumberCart(res?.data.cart?.length));

    // return res?.data;

    await getUserCart(userID, token, dispatch, axiosJWT);

    return res?.data;
    
  } catch (error) {
    console.log(error);
  }
};

export const postPackageBill = async (group_id, data, token, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/bill/${group_id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};