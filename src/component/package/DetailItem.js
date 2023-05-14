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
} from "@mui/material";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { createAxios } from "../../http/createInstance.js";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { updateUserCart } from "../../redux/packageRequest";
import { loginSuccess } from "../../redux/authSlice";

function DetailItem({ item }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const userCart = useSelector((state) => state.sidebar?.cart);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(0);
  const [arrowLeftMem, setArrowLeftMem] = useState(false);
  const [arrowRightMem, setArrowRightMem] = useState(false);

  const [duration, setDuration] = useState(0);
  const [arrowLeftDura, setArrowLeftDura] = useState(false);
  const [arrowRightDura, setArrowRightDura] = useState(false);

  const [money, setMoney] = useState(0);

  const handleArrowLeftMem = () => {
    setMember(member - 1);
  };
  const handleArrowRightMem = () => {
    setMember(member + 1);
  };

  const handleArrowLeftDura = () => {
    //
  };
  const handleArrowRightDura = () => {
    //
  };

  const handleButtonShoppingCart = () => {
    let shoppingCart = userCart;
    console.log(shoppingCart);
    let formData = {
      package: item._id,
      quantity: 1,
    };
    for (let ele of shoppingCart) {
      if (ele.package === item._id) {
        formData.quantity = ele.quantity + 1;
      }
    }
    shoppingCart = [
      ...shoppingCart.filter((data) => data.package !== item._id),
      formData,
    ];
    let formCart = {
      cart: shoppingCart,
    };
    console.log(formCart);
    updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  useEffect(() => {
    if (member <= 0) {
      setArrowLeftMem(true);
    } else {
      setArrowLeftMem(false);
    }
  }, [member]);

  return (
    <Card
      sx={{ width: "25%", backgroundColor: Colors.search, marginX: "10px" }}
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
        {item.description.split("\n").map((el, index) => (
          <Typography variant="body2" key={index} gutterBottom align="justify" >
            + {el}
          </Typography>
        ))}
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Stack>
          <Typography variant="overline" display="block" gutterBottom>
            Số người
          </Typography>
          <Box className="item">
            <IconButton disabled={arrowLeftMem} onClick={handleArrowLeftMem}>
              <CiSquareMinus />
            </IconButton>
            <CustomComponents.CssTextField size="small" value={member} />
            <IconButton disabled={arrowRightMem} onClick={handleArrowRightMem}>
              <CiSquarePlus />
            </IconButton>
          </Box>
        </Stack>
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Stack>
          <Typography variant="overline" display="block" gutterBottom>
            Thời gian
          </Typography>
          <Box className="item">
            <IconButton disabled={arrowLeftDura} onClick={handleArrowLeftDura}>
              <CiSquareMinus />
            </IconButton>
            <CustomComponents.CssTextField size="small" value={duration} />
            <IconButton
              disabled={arrowRightDura}
              onClick={handleArrowRightDura}
            >
              <CiSquarePlus />
            </IconButton>
          </Box>
        </Stack>
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Typography variant="subtitle2" gutterBottom className="item" fontSize={25} paddingTop={2}>
          {money}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <CustomComponents.Button2>Thêm vào giỏ hàng</CustomComponents.Button2>
        <CustomComponents.Button1>Mua gói</CustomComponents.Button1>
      </CardActions>
    </Card>
  );
}

export default DetailItem;
