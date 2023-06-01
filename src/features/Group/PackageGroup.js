import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../http/createInstance";
import { updateActivatePackage } from "../../redux/userRequest";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import { useNavigate } from "react-router-dom";

function PackageGroup({ item, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  // const [btn, setBtn] = useState(
  //   item.status === "Not activated" ? true : false
  // );

  const btn = item.status === "Not activated" ? true : false;

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleActivatePackage = async () => {
    await updateActivatePackage(id, user?.accessToken, item, dispatch, axiosJWT);
  };

  const handleRenewGroup = async () => {

    navigate(`/group-package?groupID=${id}`);

  }

  return (
    <Box>
      <Stack
        spacing={1}
        sx={{
          width: "100%",
          bgcolor: Colors.background,
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingX: "20px",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5" color={Colors.textPrimary}>
            Gói người dùng
          </Typography>
          <Box>
            {btn ? (
              <Button
                variant="contained"
                color="success"
                sx={{ width: "140px", borderRadius: '10px' }}
                onClick={handleActivatePackage}
              >
                Kích hoạt gói
              </Button>
            ) : (
              <CustomComponent.Button2 sx={{ width: "140px" }} onClick={handleRenewGroup}>
                Gia hạn gói
              </CustomComponent.Button2>
            )}
          </Box>
        </Box>
        <Box className="package-group">
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Tên gói:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            {item.package.name}
          </Typography>
        </Box>
        <Box className="package-group" >
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Thời hạn:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            {item.package.duration}
          </Typography>
        </Box>
        <Box className="package-group" sx={{ paddingBottom: "10px" }}>
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Số thành viên:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            {item.package.noOfMember}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default PackageGroup;
