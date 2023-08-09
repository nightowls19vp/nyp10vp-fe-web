import React, { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Colors } from "../../../config/Colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarComponent from "../../../component/calendar/Calendar";
import AddTask from "./AddTask";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "60%", md: "50%", lg: "30%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupTasks({ grId, item }) {
  const [open, setOpen] = React.useState(false);
  const [listMember, setListMember] = useState();
  const [events, setEvents] = useState({ title: "", start: "", end: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getUsersInGroup = () => {
      let array = [];
      for (let member of item.members) {
        let formData = {
          _id: member.user._id,
          name: member.user.name,
        };
        array.push(formData);
      }
      setListMember(array);

      let allEvent = [];
      
      for (let el of item.task) {
        let x = el.startDate;
        if (el.recurrence?.ends) {
          x = el.recurrence?.ends;
        }
        let formData = {
          title: el.summary,
          start: new Date(el.startDate),
          end: new Date(x),
        };
        allEvent.push(formData);
      }
      console.log(item.task);
      setEvents(allEvent);
    };

    getUsersInGroup();

    return () => {
      getUsersInGroup();
    };
  }, [item]);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Box className="flex-group">
        <Box className="title-group-spending">
          <CalendarMonthIcon
            sx={{
              paddingRight: "10px",
              color: Colors.textPrimary,
              fontSize: "50px",
            }}
          />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Sự kiện trong nhóm
          </Typography>
        </Box>
        <Tooltip title="Thêm sự kiện">
          <IconButton onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTask
              grID={item._id}
              item={listMember}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </Box>
      {events.length > 0 && <CalendarComponent events={events} />}
    </Stack>
  );
}

export default GroupTasks;
