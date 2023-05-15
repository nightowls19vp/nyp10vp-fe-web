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
  const userCart = useSelector((state) => state.sidebar?.cart);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(item.noOfMember);
  const [arrowLeftMem, setArrowLeftMem] = useState(true);
  const [arrowRightMem, setArrowRightMem] = useState(false);

  const [duration, setDuration] = useState(item.duration);
  const [arrowLeftDura, setArrowLeftDura] = useState(true);
  const [arrowRightDura, setArrowRightDura] = useState(false);

  const [money, setMoney] = useState(item.price);

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

  const handleButtonAdd = async () => {
    let shoppingCart = userCart;
    let formData = {
      package: item._id,
      quantity: 1,
      noOfMemb: member,
      duration: duration,
    };
    for (let ele of shoppingCart) {
      if (
        ele.package === item._id &&
        ele.noOfMemb === member &&
        ele.duration === duration
      ) {
        formData.quantity = ele.quantity + 1;
      }
    }
    shoppingCart = [
      ...shoppingCart.filter(
        (data) =>
          data.package !== item._id ||
          data.noOfMemb !== member ||
          data.duration !== duration
      ),
      formData,
    ];
    let formCart = {
      cart: shoppingCart,
    };
    console.log(formCart);
    await updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    await getUserCart(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  const handleButtonBuy = async () => {
    let shoppingCart = userCart;
    console.log(shoppingCart);
    let formData = {
      package: item._id,
      quantity: 1,
      noOfMemb: member,
      duration: duration,
    };
    for (let ele of shoppingCart) {
      if (
        ele.package === item._id &&
        ele.noOfMemb === item.noOfMember &&
        ele.duration === item.duration
      ) {
        formData.quantity = ele.quantity + 1;
      }
    }
    shoppingCart = [
      ...shoppingCart.filter(
        (data) =>
          data.package !== item._id ||
          data.noOfMemb !== member ||
          data.duration !== duration
      ),
      formData,
    ];
    let formCart = {
      cart: shoppingCart,
    };
    console.log(formCart);
    await updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    await getUserCart(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
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
        (item.price + member * duration * (item.coefficient ?? 0)) * 0.7
      );
    } else {
      setMoney(item.price + member * duration * (item.coefficient ?? 0));
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
          <Typography variant="body2" key={index} gutterBottom align="justify">
            + {el}
          </Typography>
        ))}
        <Divider flexItem sx={{ paddingY: "10px" }} />
        <Stack>
          <Typography variant="overline" display="block" gutterBottom>
            Số người
          </Typography>
          {item.name === "Family Package" ? (
            <Box className="item">
              <CustomComponents.CssTextField size="small" value={member} />
            </Box>
          ) : (
            <Box className="item">
              <IconButton disabled={arrowLeftMem} onClick={handleArrowLeftMem}>
                <CiSquareMinus />
              </IconButton>
              <CustomComponents.CssTextField size="small" value={member} />
              <IconButton
                disabled={arrowRightMem}
                onClick={handleArrowRightMem}
              >
                <CiSquarePlus />
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
              <CustomComponents.CssTextField size="small" value={duration} />
            </Box>
          ) : (
            <Box className="item">
              <IconButton
                disabled={arrowLeftDura}
                onClick={handleArrowLeftDura}
              >
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
          {Math.round(money)}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <CustomComponents.Button2 onClick={handleButtonAdd}>
          Thêm vào giỏ hàng
        </CustomComponents.Button2>
        <CustomComponents.Button1 onClick={handleButtonBuy}>
          Mua gói
        </CustomComponents.Button1>
      </CardActions>
    </Card>
  );
}

export default DetailItem;
