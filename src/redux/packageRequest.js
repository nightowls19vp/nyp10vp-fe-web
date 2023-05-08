import apiClient from "../http/http-common.js";

export const getAllPackage = async () => {
  try {
    const res = await apiClient.get("/pkg-mgmt/pkg");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
