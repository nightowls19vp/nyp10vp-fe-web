import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import { postPackageBill } from "../../redux/userRequest";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function FormSpending({ grID, item }) {
  const nowDate = new Date();

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [name, setName] = useState("");
  const [hostName, setHostName] = useState("");
  const [memName, setMemName] = useState([{ _id: "0", name: "", amount: 0 }]);
  const [date, setDate] = useState(nowDate);
  const [money, setMoney] = useState("");
  const [idxUser, setIdxUser] = useState(0);
  const [description, setDescription] = useState("");
  const [flag, setFlag] = useState(false);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleChangeHost = (e) => {
    setHostName(e.target.value);
  };

  const handleChangeMember = (e) => {
    memName.pop();
    let id = e.target.value;
    let member = item.find((x) => x._id === id);
    let formData = {
      _id: id,
      name: member.name,
      amount: 0,
    };
    let array = [...memName];
    array.push(formData);

    setMemName(array);
  };

  const handleChangeAmount = (e, id) => {
    setMoney(e.target.value);
    setIdxUser(id);
  };

  const handleAddMember = () => {
    setFlag(false);
    let array = [...memName];
    let last_it = memName[memName.length - 1];
    if (money === "" || last_it._id === "0") {
      setFlag(true);
      return;
    }

    array[idxUser].amount = money;
    setMoney("");

    if (last_it._id !== "0") {
      let formData = {
        _id: "0",
        name: "",
        amount: 0,
      };
      array.push(formData);
      console.log(array);
      setMemName(array);
    }
  };

  const handleGroupBill = async () => {
    let array = [...memName];
    array[idxUser].amount = money;

    let borrowers = [];
    for (let el of array) {
      if (el._id !== "0") {
        let data = {
          borrower: el._id,
          amount: el.amount
        }
        borrowers.push(data);
      }
    }
    let formData = {
      summary: name,
      date: date,
      borrowers: borrowers,
      lender: hostName,
      description: description
    };

    console.log("bill: ", formData);

    await postPackageBill(grID, formData, user?.accessToken, dispatch, axiosJWT);
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Input
        id="modal-modal-title"
        placeholder="Tên chi tiêu"
        value={name}
        fontSize={18}
        className="name-bill"
        onChange={(e) => setName(e.target.value)}
      />
      <Stack id="modalFormSpending" spacing={2} className="modalModalSpending">
        <Box className="title-group-spending">
          <Typography variant="body2" sx={{ minWidth: "100px" }}>
            Ngày chi tiêu:
          </Typography>
          <DateTimePicker
            valueDay={date}
            handleDateTimePicker={handleDateTimePicker}
          />
        </Box>

        <Box className="title-group-spending">
          <Typography variant="body2" sx={{ minWidth: "100px" }}>
            Người chi trả:
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-host-name"
              id="select-host-name"
              size="small"
              value={hostName}
              onChange={handleChangeHost}
            >
              {item?.map((member) =>
                member ? (
                  <MenuItem key={member._id} value={member._id}>
                    {member.name}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </Box>

        {/* <Box className="title-group-spending">
          <Typography variant="body2" sx={{ minWidth: "100px" }}>
            Số tiền:
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </Box> */}

        <Box className="title-group-spending">
          <Typography variant="body2" sx={{ minWidth: "100px" }}>
            Mô tả:
          </Typography>
          <TextField
            multiline
            fullWidth
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box
          className="title-group-spending"
          sx={{ justifyContent: "space-between" }}
        >
          <Typography variant="body2" sx={{ minWidth: "100px" }}>
            Thêm thành viên
          </Typography>
          <IconButton onClick={handleAddMember}>
            <PersonAddAlt1Icon />
          </IconButton>
        </Box>

        {memName?.map((route, idx) =>
          route ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                paddingY: "5px",
              }}
              key={idx}
            >
              {route._id !== "0" && route.amount !== 0 ? (
                <Box className="added-member-success">
                  <Box flex={2}>
                    <Typography variant="button" display="block" fontSize={14}>
                      {route.name}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="button" display="block" fontSize={14}>
                      {route.amount} vnd
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography
                      variant="button"
                      display="block"
                      sx={{ fontSize: 14, textAlign: "center" }}
                    >
                      pedding
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box className="added-member">
                  <FormControl sx={{ width: "50%" }}>
                    <InputLabel id="demo-simple-select-member">
                      Chọn thành viên
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-member"
                      id="select-member"
                      size="small"
                      value={route._id}
                      label="Chọn thành viên"
                      onChange={handleChangeMember}
                    >
                      {item.map((member) =>
                        member ? (
                          <MenuItem key={member._id} value={member._id}>
                            {member.name}
                          </MenuItem>
                        ) : null
                      )}
                      <MenuItem value="0"></MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ width: "50%", paddingLeft: "10px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={money}
                      placeholder="Nhập tiền"
                      onChange={(e) => handleChangeAmount(e, idx)}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ) : null
        )}
        {flag ? (
          <Box>
            <Typography
              variant="caption"
              display="block"
              color={Colors.error}
              sx={{ fontStyle: "italic" }}
            >
              Vui lòng điền đầy đủ!
            </Typography>
          </Box>
        ) : null}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomComponent.Button2 sx={{ width: "100%" }} onClick={handleGroupBill} >
            Hoàn thành
          </CustomComponent.Button2>
        </Box>
      </Stack>
    </Box>
  );
}

export default FormSpending;
