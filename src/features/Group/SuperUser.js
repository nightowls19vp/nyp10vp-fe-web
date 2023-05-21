import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  Tab,
  Modal,
  Button,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AiFillCamera, AiOutlineEdit } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Group.scss";
import ImgAvatar from "../../assets/img/user.png";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import PackagesGroup from "./PackagesGroup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SuperUser({ item }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.user?.userInfo.user);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(userInfo.avatar ?? ImgAvatar);
  const [name, setName] = useState(item.name);
  const [linkInvite, setLinkInvite] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
  };

  const handleButtonSave = () => {
    console.log(name.length);
  };

  const handleButtonInvite = async () => {
    const res = await usersInvitePeople(user?.accessToken, item._id, axiosJWT);
    let link = "http://localhost:8080";
    link += res.data;
    setLinkInvite(link);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      // paddingY={5}
      // paddingX={2}
      spacing={2}
      sx={{ paddingX: { xs: '0px', sm: '5px', md: '10px'}}}
    >
      <Box className="title-group">
        <Box align={"center"} sx={{ paddingRight: '10px' }}>
          <CustomComponent.ButtonAvatar onClick={handleClick} >
            <CustomComponent.ImageSrc
              style={{ backgroundImage: `url(${image})` }}
            />
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
            <CustomComponent.Image>
              <Box bgcolor={Colors.gray} borderRadius={"50%"} padding={"8px"}>
                <AiFillCamera color={Colors.black} size={25} />
              </Box>
            </CustomComponent.Image>
          </CustomComponent.ButtonAvatar>
        </Box>
        <Typography variant="h6"> {item.name} </Typography>
        <IconButton onClick={handleOpen}>
          <AiOutlineEdit />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="body2" component="h2">
              Mọi người đều biết khi tên nhóm thay đổi.
            </Typography>
            <TextField
              multiline
              fullWidth
              value={name}
              sx={{ marginY: "10px" }}
              onChange={(e) => setName(e.target.value)}
            />
            <div align="right">
              <CustomComponent.Button1 onClick={handleButtonSave}>
                Lưu
              </CustomComponent.Button1>
            </div>
          </Box>
        </Modal>
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '100%', md: '70%' }, typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="title-packages-group">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1"  sx={{ marginX: { xs: '0px', sm: '0px', md: '40px'} }} />
              <Tab label="Item Two" value="2"  sx={{ marginX: { xs: '0px', sm: '0px', md: '40px'} }} />
            </TabList>
          </Box>
          <TabPanel value="1"> <PackagesGroup /> </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>

      <Box className="btn-invite">
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
    </Stack>
  );
}

export default SuperUser;
