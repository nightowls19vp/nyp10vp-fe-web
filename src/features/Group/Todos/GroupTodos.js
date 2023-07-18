import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  IconButton,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
//import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
// import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createAxios } from "../../../http/createInstance";
import { Colors } from "../../../config/Colors";
import FormTodos from "./FormTodos";
import TodoDetail from "./TodoDetail";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../../../redux/packageSlice";
import { deletedTodos } from "../../../redux/packageRequest";
import { loginSuccess } from "../../../redux/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "70%", lg: "50%" },
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupTodos({ grId, item }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = (todo) => (event, isExpanded) => {
    setExpanded(isExpanded ? todo._id : false);
    dispatch(updateTodos(todo));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteTodos = async (e, todo) => {
    const res = await deletedTodos(
      grId,
      todo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    console.log(res);
  };
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Box className="flex-group">
        <Box className="title-group-spending">
          <TaskAltIcon
            sx={{
              paddingRight: "10px",
              color: Colors.textPrimary,
              fontSize: "50px",
            }}
          />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Các việc cần làm trong nhóm
          </Typography>
        </Box>
        <IconButton onClick={handleOpen}>
          <AddTaskIcon sx={{ color: Colors.textPrimary, fontSize: "32px" }} />
        </IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormTodos todoID={item._id} handleClose={handleClose} />
        </Box>
      </Modal>

      {item?.todos !== null && item?.todos?.length > 0
        ? item.todos.map((todo, idx) =>
            todo ? (
              <Accordion
                key={idx}
                expanded={expanded === todo._id}
                onChange={handleChangeAccordion(todo)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${todo._id}-content`}
                  id={`${todo._id}-header`}
                >
                  <Typography
                    //variant="caption"
                    //display="block"
                    sx={{
                      fontSize: "22px",
                      fontWeight: 500,
                      color: "#5186AD",
                    }}
                  >
                    {todo.summary}
                  </Typography>
                  {/* <Typography sx={{ color: "text.secondary" }}>
                    2/3
                  </Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                  {todo !== null && <TodoDetail grID={grId} item={todo} />}
                </AccordionDetails>
                <AccordionActions>
                  <IconButton onClick={(e) => handleDeleteTodos(e, todo)}>
                    <DeleteIcon sx={{ color: Colors.error }} />
                  </IconButton>
                </AccordionActions>
              </Accordion>
            ) : null
          )
        : null}
    </Stack>
  );
}

export default GroupTodos;
