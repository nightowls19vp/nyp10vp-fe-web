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
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Colors } from "../../../config/Colors";
import FormTodos from "./FormTodos";
import TodoDetail from "./TodoDetail";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../../../redux/packageSlice";

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
  const listTodo = useSelector((state) => state?.package?.todos);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = (todo) => (event, isExpanded) => {
    setExpanded(isExpanded ? todo._id : false);
    dispatch(updateTodos(todo));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Stack sx={{ width: "100%" }}>
      <Box className="title-group-spending">
        <EventIcon
          sx={{
            paddingRight: "10px",
            color: Colors.textPrimary,
            fontSize: "50px",
          }}
        />
        <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
          Các việc cần làm trong nhóm
        </Typography>

        <IconButton onClick={handleOpen}>
          <ControlPointIcon sx={{ color: Colors.textPrimary }} />
        </IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormTodos todoID={item._id} />
        </Box>
      </Modal>

      {item.todos !== null && item.todos.length > 0
        ? item.todos.map((todo, idx) => (
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
                <Typography>{todo.summary}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {todo !== null && <TodoDetail grID={grId} item={todo} />}
              </AccordionDetails>
            </Accordion>
          ))
        : null}
    </Stack>
  );
}

export default GroupTodos;
