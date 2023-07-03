import React, { useState } from "react";

import {
  MenuItem,
  Select,
  FormControl,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from "../../http/createInstance";

import "../../assets/css/Bill.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { updateStatusBill } from "../../redux/userRequest";
import { loginSuccess } from "../../redux/authSlice";

function BillDetail({ item, statusBill }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const [status, setStatus] = useState(statusBill);
  const [listChange, setListChange] = useState([]);
  const date = new Date(item?.date);

  const handleChange = (event, id) => {
    setStatus(event.target.value);
    let newArray = [...listChange.filter((data) => data.user !== id)];
    let formData = {
      user: id,
      status: event.target.value
    };
    newArray.push(formData);
    setListChange(newArray);
  };

  const handleChangeStatus = async () => {
    let formData = {
      borrowers: listChange
    };
    console.log(formData, item._id);
    const res = await updateStatusBill(item._id, formData, user?.accessToken, dispatch, axiosJWT);
    console.log(res);
  }
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4">{item?.summary}</Typography>
      <Stack spacing={2} id="modalBillDetail" className="modalModalBillDetail">
        <Typography variant="subtitle1">{date.toDateString()}</Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {item?.description}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
            Nguoi chi tra:
          </Typography>
          <Typography sx={{ marginLeft: "10px" }}>
            {item?.lender.name}
          </Typography>
        </Box>
        {item?.borrowers.map((route, idx) =>
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
                <Typography>{route.amount}</Typography>
              </Box>
              {userInfo._id === item?.lender._id ? (
                <Box>
                  <FormControl
                    sx={{
                      width: "120px",
                      backgroundColor:
                        status === "PENDING"
                          ? "#ccffdd"
                          : status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",

                      borderColor:
                        status === "PENDING"
                          ? "#ccffdd"
                          : status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-status"
                      id="demo-simple-status"
                      size="small"
                      value={status}
                      onChange={(event) => handleChange(event, route.borrower._id)}
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
                    width: "120px",
                    backgroundColor:
                      status === "PENDING"
                        ? "#ccffdd"
                        : status === "APPROVED"
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
                        status === "PENDING"
                          ? "#008000"
                          : status === "APPROVED"
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
        {userInfo._id === item?.lender._id ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ paddingRight: "5px" }}>
              <CustomComponent.Button2>Xóa</CustomComponent.Button2>
            </Box>
            <Box sx={{ paddingLeft: "5px" }}>
              <CustomComponent.Button1 disabled={listChange.length > 0 ? false : true} onClick={handleChangeStatus}>
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
