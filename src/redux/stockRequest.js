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
