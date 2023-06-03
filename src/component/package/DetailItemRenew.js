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
  Modal,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { createAxios } from "../../http/createInstance.js";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { loginSuccess } from "../../redux/authSlice";
import {
  getGroupByUserId,
  getInformationUser,
  userRenewGroup,
} from "../../redux/userRequest.js";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #e6e6e6",
  boxShadow: 24,
  p: 4,
};

function DetailItemRenew({ item, grpId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const order = useSelector((state) => state?.auth?.order);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(item.noOfMember);
  const [arrowLeftMem, setArrowLeftMem] = useState(true);
  const [arrowRightMem, setArrowRightMem] = useState(false);

  const [duration, setDuration] = useState(item.duration);
  const [arrowLeftDura, setArrowLeftDura] = useState(true);
  const [arrowRightDura, setArrowRightDura] = useState(false);

  const [money, setMoney] = useState(item.price);
  const [valueMethod, setValueMethod] = useState('zalo');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleChange = (event) => {
    setValueMethod(event.target.value);
  };

  const handleCheckoutPackageRenew = async (event, item) => {
    let formData = {
      package: item._id,
      noOfMember: item.noOfMember,
      duration: item.duration,
    };

    let methodValue = {};

    if (valueMethod === 'zalo') {
      methodValue = {
        type: "EWALLET",
        bank_code: "ZALOPAY"
      }
    } else {
      methodValue = {
        type: "EWALLET",
        bank_code: "VNPAY"
      }
    }

    let data = {
      cart: formData,
      method: methodValue
    };

    console.log(data);
    
    const res = await userRenewGroup(
      grpId,
      user?.accessToken,
      dispatch,
      data,
      axiosJWT
    );

    console.log(res);

    window.open(order.order.order_url);

    if (res.statusCode === 200) {
      const interValCheck = setInterval(async () => {
        await getInformationUser(
          user?.data.userInfo._id,
          user?.accessToken,
          dispatch,
          axiosJWT
        );

        console.log(userInfo.user.trxHist, order.trans._id);

        if (userInfo.user.trxHist.includes(order.trans._id)) {
          console.log(order.trans._id, "exists in trxHist");

          clearInterval(interValCheck);
        }
      }, 10 * 1000);

      setTimeout(() => {
        clearInterval(interValCheck);
      }, 3 * 60 * 1000);

      await getGroupByUserId(
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      navigate("/group");
    }
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
    <>
      <Card
        sx={{
          width: { xs: "70%", sm: "40%", md: "30%", lg: "25%" },
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
                <IconButton
                  disabled={arrowLeftMem}
                  onClick={handleArrowLeftMem}
                >
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
          <CustomComponents.Button1 fullWidth onClick={handleOpen} sx={{ marginX: '7px'}}>
            Mua gói
          </CustomComponents.Button1>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <FormControl>
              <FormLabel id="radio-buttons-method-total">
                Chọn phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={valueMethod}
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="zalo"
                  control={<Radio />}
                  label="Zalo"
                />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label="Vnpay"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
            <CustomComponents.Button1
              onClick={(event) => handleCheckoutPackageRenew(event, item)}
            >
              Thanh toán
            </CustomComponents.Button1>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default DetailItemRenew;
