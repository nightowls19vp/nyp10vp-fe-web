import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Colors } from "../../config/Colors";
import DateTimePicker from "../../component/Date/DateTimePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "20px",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  p: 4,
};

function GroupSpending({ item }) {
  let listMember = [];
  for (let member of item.members) {
    let formData = {
      _id: member.user.user._id,
      name: member.user.user.name,
    };
    listMember.push(formData);
  }
  let formData = {
    _id: "648406c2549163797aa486ww",
    name: "user2",
  };
  listMember.push(formData);


  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [member, setMember] = useState(listMember[0]);
  const [des, setDes] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  return (
    <Stack>
      <Box className="title-group-spending">
        <MonetizationOnOutlinedIcon
          sx={{
            paddingRight: "10px",
            color: Colors.textPrimary,
            fontSize: "50px",
          }}
        />
        <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
          Quản lý chi tiêu trong nhóm
        </Typography>
      </Box>
      <Button onClick={handleOpen}> Thêm chi tiêu mới </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
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
              <TextField select value={member._id} fullWidth>
                {listMember.map((route) =>
                  route ? (
                    <MenuItem key={route._id} value={route._id}>
                      {route.name}
                    </MenuItem>
                  ) : null
                )}
              </TextField>
            </Box>

            <Box className="title-group-spending">
              <Typography variant="body2" sx={{ minWidth: "100px" }}>
                Mô tả:
              </Typography>
              <TextField
                multiline
                fullWidth
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </Box>

            <Box className="title-group-spending">
              <Typography variant="body2" sx={{ minWidth: "100px" }}>
                Thêm thành viên
              </Typography>
              <TextField
                multiline
                fullWidth
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

export default GroupSpending;
