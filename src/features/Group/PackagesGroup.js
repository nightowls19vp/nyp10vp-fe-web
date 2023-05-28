import React, { useState } from "react";
import { Box, TextField, Stack, Typography, Avatar } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch, useSelector } from "react-redux";

import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import PackageGroup from "./PackageGroup";

function PackagesGroup({ data }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);

  const [linkInvite, setLinkInvite] = useState("");

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleButtonInvite = async () => {
    const res = await usersInvitePeople(user?.accessToken, data._id, axiosJWT);
    let link = "http://localhost:8080";
    link += res.data;
    setLinkInvite(link);
  };
  return (
    <Stack spacing={3}>
      {data.packages.map((route, index) =>
        route ? <PackageGroup item={route} id={data._id} key={index} /> : null
      )}
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
            Thành viên trong nhóm
          </Typography>
          <CustomComponent.Button1
            sx={{ marginBottom: "10px" }}
            onClick={handleButtonInvite}
          >
            Mời thành viên
          </CustomComponent.Button1>
          {linkInvite ? (
            <TextField
              id="outlined-basic"
              fullWidth
              variant="outlined"
              value={linkInvite}
              sx={{ textOverflow: "ellipsis" }}
            />
          ) : null}
        </Box>
        {data.members.map((route) =>
          route ? (
            <Box key={route.user.user._id} className="package-group" sx={{ paddingBottom: "10px" }}>
              <Avatar src={route.user.user.avatar} />
              <Typography sx={{ paddingLeft: '10px'}}> {route.user.user.name} </Typography>
            </Box>
          ) : null
        )}
      </Stack>
    </Stack>
  );
}

export default PackagesGroup;
