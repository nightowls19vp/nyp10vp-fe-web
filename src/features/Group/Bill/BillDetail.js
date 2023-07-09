import React, { useEffect, useState } from "react";

import {
  MenuItem,
  Select,
  FormControl,
  Avatar,
  Box,
  Stack,
  Typography,
  InputBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from "../../../http/createInstance";

import "../../../assets/css/Bill.scss";
import * as CustomComponent from "../../../component/custom/CustomComponents.js";
import { deletePackageBill, updatePackageBill } from "../../../redux/userRequest";
import { loginSuccess } from "../../../redux/authSlice";

function BillDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const bill = useSelector((state) => state?.package.bill);

  const initalChange = () => {
    let arr = [];
    for (let x of bill?.borrowers) {
      let formData = {
        _id: x.borrower._id,
        amount: x.amount,
        status: x.status,
      };
      arr.push(formData);
    }
    return arr;
  };
  const [data, setData] = useState(initalChange());
  const date = new Date(bill?.date);

  const handleChangeStatus = (event, idx) => {
    let arr = [];
    for (let x of data) {
      let formData = {
        _id: x._id,
        amount: x.amount,
        status: x.status,
      };
      if (x._id === idx) {
        formData.status = event.target.value;
      }
      arr.push(formData);
    }
    setData(arr);
  };

  const handleChangeAmount = (e, idx) => {
    let arr = [];
    for (let x of data) {
      let formData = {
        _id: x._id,
        amount: x.amount,
        status: x.status,
      };
      if (x._id === idx) {
        formData.amount = e.target.value;
      }
      arr.push(formData);
    }
    setData(arr);
  };

  const handleDeleteBill = async () => {
    const res = await deletePackageBill(
      bill._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    console.log(res);
  };

  const handleUpdateBill = async () => {
    let borrowers = [];
    for (let x of data) {
      let formAmount = {
        borrower: x._id,
        amount: x.amount
      }
      borrowers.push(formAmount);
    }

    let formData = {
      summary: bill.summary,
      date: bill.date,
      borrowers: borrowers,
      lender: bill?.lender._id,
      description: bill?.description
    }

    await updatePackageBill(bill._id, formData, user?.accessToken, dispatch, axiosJWT);
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4">{bill?.summary}</Typography>
      <Stack spacing={2} id="modalBillDetail" className="modalModalBillDetail">
        <Typography variant="subtitle1">{date.toDateString()}</Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {bill?.description}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
            Nguoi chi tra:
          </Typography>
          <Typography sx={{ marginLeft: "10px" }}>
            {bill?.lender.name}
          </Typography>
        </Box>
        {bill?.borrowers.map((route, idx) =>
          route ? (
            <Box className="detail-bill-member" key={idx}>
              <Box
                flex={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar src={route.borrower.avatar} />
                <Typography sx={{ paddingLeft: "10px" }}>
                  {route.borrower.name}
                </Typography>
              </Box>
              <Box flex={1}>
                <InputBase
                  value={data[idx].amount}
                  onChange={(e) => handleChangeAmount(e, route.borrower._id)}
                />
              </Box>
              {userInfo._id === bill?.lender._id ? (
                <Box>
                  <FormControl
                    sx={{
                      width: "130px",
                      backgroundColor:
                        data[idx].status === "PENDING"
                          ? "#ccffdd"
                          : data[idx].status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",

                      borderColor:
                        data[idx].status === "PENDING"
                          ? "#ccffdd"
                          : data[idx].status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-status"
                      id="demo-simple-status"
                      size="small"
                      value={data[idx].status}
                      onChange={(event) =>
                        handleChangeStatus(event, route.borrower._id)
                      }
                    >
                      <MenuItem value={"PENDING"}>
                        <Typography
                          sx={{
                            color: "#008000",
                            fontWeight: 550,
                          }}
                        >
                          PENDING
                        </Typography>
                      </MenuItem>
                      <MenuItem value={"APPROVED"}>
                        <Typography
                          sx={{
                            color: "#0000cc",
                            fontWeight: 550,
                          }}
                        >
                          APPROVED
                        </Typography>
                      </MenuItem>
                      <MenuItem value={"CANCELED"}>
                        <Typography
                          sx={{
                            color: "#000000",
                            fontWeight: 550,
                          }}
                        >
                          CANCELED
                        </Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "130px",
                    backgroundColor:
                      route.status === "PENDING"
                        ? "#ccffdd"
                        : route.status === "APPROVED"
                        ? "#ccf5ff"
                        : "#f2f2f2",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        route.status === "PENDING"
                          ? "#008000"
                          : route.status === "APPROVED"
                          ? "#0000cc"
                          : "#000000",
                      fontWeight: 550,
                    }}
                  >
                    {route.status}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : null
        )}
        {userInfo._id === bill?.lender._id ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ paddingRight: "5px" }}>
              <CustomComponent.Button2 onClick={handleDeleteBill}>
                Xóa
              </CustomComponent.Button2>
            </Box>
            <Box sx={{ paddingLeft: "5px" }}>
              <CustomComponent.Button1
                onClick={handleUpdateBill}
              >
                Lưu thay đổi
              </CustomComponent.Button1>
            </Box>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}

export default BillDetail;
