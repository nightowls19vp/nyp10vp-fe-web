import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { Colors } from "../../config/Colors";
import DateTimePicker from "../../component/Date/DateTimePicker";

// const style = {
//   width: "70%",
//   bgcolor: "background.paper",
//   borderRadius: "20px",
//   boxShadow:
//     "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//   p: 4,
// };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function FormSpending({ item }) {
  const nowDate = new Date();
  //   let listMember = [];

  //   for (let member of item.members) {
  //     let formData = {
  //       _id: member.user.user._id,
  //       name: member.user.user.name,
  //     };
  //     listMember.push(formData);
  //   }
  //   let formData = {
  //     _id: "648406c2549163797aa486ww",
  //     name: "user2",
  //   };
  //   listMember.push(formData);

  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(nowDate);
  const [money, setMoney] = useState(0);
  const [hostName, setHostName] = useState("");
  const [memName, setMemName] = useState("");
  const [description, setDescription] = useState("");

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleChangeHost = (e) => {
    setHostName(e.target.value);
    let listMember = [];
    listMember = [...list.filter((member) => member._id !== e.target.value)];
    setList(listMember);
  };

  const handleChangeMember = (e) => {
    setMemName(e.target.value);
    let listMember = [];
    listMember = [...list.filter((member) => member._id !== e.target.value)];
    setList(listMember);
  };

  const handleAddMember = () => {
    //
  };

  return (
  
    <Stack spacing={2} sx={{ width: { xs: "100%", md: "70%", lg: "50%" } }} >
      <TextField
        id="modal-modal-title"
        fullWidth
        label="Tên chi tiêu"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={hostName}
          onChange={handleChangeHost}
          input={<OutlinedInput fullWidth />}
          MenuProps={MenuProps}
        >
          {list.map((route) =>
            route ? (
              <MenuItem key={route._id} value={route._id}>
                {route.name}
              </MenuItem>
            ) : null
          )}
        </Select>
      </Box>

      <Box className="title-group-spending">
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Số tiền:
        </Typography>
        <TextField
          fullWidth
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </Box>

      <Box className="title-group-spending">
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Mô tả:
        </Typography>
        <TextField
          multiline
          fullWidth
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

      <Select
        labelId="demo-multiple-name-label"
        id="add-member"
        value={memName}
        onChange={handleChangeMember}
        input={<OutlinedInput fullWidth />}
        MenuProps={MenuProps}
      >
        {list.map((route) =>
          route ? (
            <MenuItem key={route._id} value={route._id}>
              {route.name}
            </MenuItem>
          ) : null
        )}
      </Select>
    </Stack>
    
  );
}

export default FormSpending;
