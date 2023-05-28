import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Box,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  AlertTitle,
  Alert,
} from "@mui/material";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import { createAxios } from "../../http/createInstance.js";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { getUserCart, updateUserCart } from "../../redux/packageRequest";
import { loginSuccess } from "../../redux/authSlice";

function DetailItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userCart = useSelector((state) => state.package?.cart);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(item.noOfMember);
  const [arrowLeftMem, setArrowLeftMem] = useState(true);
  const [arrowRightMem, setArrowRightMem] = useState(false);

  const [duration, setDuration] = useState(item.duration);
  const [arrowLeftDura, setArrowLeftDura] = useState(true);
  const [arrowRightDura, setArrowRightDura] = useState(false);

  const [money, setMoney] = useState(item.price);

  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(0);
  const [msg, setMsg] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleArrowLeftMem = () => {
    setMember(member - 1);
  };
  const handleArrowRightMem = () => {
    setMember(member + 1);
  };

  const handleArrowLeftDura = () => {
    setDuration(duration - 1);
  };
  const handleArrowRightDura = () => {
    setDuration(duration + 1);
  };

  const handleButtonAdd = async (event, item) => {
    let shoppingCart = [];
    for (let ele of userCart) {
      let data = {
        package: ele._id,
        quantity: ele.quantity,
        noOfMember: ele.noOfMember,
        duration: ele.duration,
      };
      shoppingCart.push(data);
    }

    let formData = {
      package: item._id,
      quantity: 1,
      noOfMember: member,
      duration: duration,
    };

    for (let ele of shoppingCart) {
      if (
        ele.package === item._id &&
        ele.noOfMember === member &&
        ele.duration === duration
      ) {
        formData.quantity = ele.quantity + 1;
      }
    }

    shoppingCart = [
      ...shoppingCart.filter(
        (data) =>
          data.package !== item._id ||
          data.noOfMember !== member ||
          data.duration !== duration
      ),
      formData,
    ];

    let formCart = {
      cart: shoppingCart,
    };

    console.log(formCart);

    const res = await updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      axiosJWT
    );

    setOpenDialog(true);
    if (res.statusCode === 200) {
      setStatus(1);
      setMsg("Cập nhật giỏ hàng thành công");
    } else {
      setStatus(2);
      setMsg("Cập nhật giỏ hàng thất bại!");
    }

    setTimeout(() => {
      setStatus(0);
      setMsg("");
      setOpenDialog(false);
    }, 3000);

    await getUserCart(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  const handleButtonBuy = async (event, item) => {
    await handleButtonAdd(event, item);
    navigate("/shopping-cart");
  };

  useEffect(() => {
    if (member <= item.noOfMember) {
      setArrowLeftMem(true);
    } else {
      setArrowLeftMem(false);
    }

    if (member > 100) {
      setArrowRightMem(true);
    } else {
      setArrowRightMem(false);
    }

    if (duration <= item.duration) {
      setArrowLeftDura(true);
    } else {
      setArrowLeftDura(false);
    }

    if (duration > 100) {
      setArrowRightDura(true);
    } else {
      setArrowRightDura(false);
    }

    if (duration >= 12) {
      setMoney(
        (item.price + (member - 2) * duration * (item.coefficient ?? 0)) * 0.7
      );
    } else {
      setMoney(item.price + (member - 2) * duration * (item.coefficient ?? 0));
    }
  }, [
    duration,
    item.coefficient,
    item.duration,
    item.noOfMember,
    item.price,
    member,
  ]);

  return (
    <Card
      sx={{
        width: { xs: "70%", sm: "40%", md: "25%" },
        margin: "10px",
        bgcolor: Colors.background,
        borderRadius: "10px",
        boxShadow: "2px 2px 5px #8c8c8c",
      }}
    >
      <CardContent>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          align="center"
          fontSize={18}
          color={Colors.textPrimary}
        >
          {item.name}
        </Typography>
        <Box sx={{ height: "150px" }}>
          {item.description.split("\n").map((el, index) => (
            <Typography
              variant="body2"
              key={index}
              gutterBottom
              align="justify"
            >
              + {el}
            </Typography>
          ))}
        </Box>
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Stack>
          <Typography variant="overline" display="block" gutterBottom>
            Số người
          </Typography>
          {item.name === "Family Package" ? (
            <Box className="item">
              {/* <CustomComponents.CssTextField size="small" value={member} /> */}
              <Typography variant="subtitle1" fontSize={18} gutterBottom>
                {member}
              </Typography>
            </Box>
          ) : (
            <Box className="item">
              <IconButton disabled={arrowLeftMem} onClick={handleArrowLeftMem}>
                <CiSquareMinus
                  color={arrowLeftMem ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton>
              <Typography variant="subtitle1" fontSize={18}>
                {member}
              </Typography>
              <IconButton
                disabled={arrowRightMem}
                onClick={handleArrowRightMem}
              >
                <CiSquarePlus
                  color={arrowRightMem ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton>
            </Box>
          )}
        </Stack>
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Stack>
          <Typography variant="overline" display="block" gutterBottom>
            Thời gian
          </Typography>
          {item.name === "Experience Package" ||
          item.name === "Annual Package" ||
          item.name === "Family Package" ? (
            <Box className="item">
              <Typography variant="subtitle1" fontSize={18} gutterBottom>
                {duration}
              </Typography>
            </Box>
          ) : (
            <Box className="item">
              <IconButton
                disabled={arrowLeftDura}
                onClick={handleArrowLeftDura}
              >
                <CiSquareMinus
                  color={arrowLeftDura ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton>
              <Typography variant="subtitle1" fontSize={18}>
                {duration}
              </Typography>
              <IconButton
                disabled={arrowRightDura}
                onClick={handleArrowRightDura}
              >
                <CiSquarePlus
                  color={arrowRightDura ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton>
            </Box>
          )}
        </Stack>
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Typography
          variant="subtitle2"
          gutterBottom
          className="item"
          fontSize={25}
          paddingTop={2}
        >
          {Math.round(money)} VNĐ
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <CustomComponents.Button2
          onClick={(event) => handleButtonAdd(event, item)}
        >
          Thêm vào giỏ hàng
        </CustomComponents.Button2>
        <CustomComponents.Button1 onClick={(event) => handleButtonBuy(event, item)}>
          Mua gói
        </CustomComponents.Button1>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <Box sx={{height: '100%', width: '100%'}}>
              {status === 0 ? null : status === 1 ? (
                <Alert severity="success">
                  <AlertTitle>Thành công</AlertTitle>
                  {msg}
                </Alert>
              ) : (
                <Alert severity="error">
                  <AlertTitle>Thất bại</AlertTitle>
                  {msg}
                </Alert>
              )}
            </Box>
        </Dialog>
      </CardActions>
    </Card>
  );
}

export default DetailItem;
