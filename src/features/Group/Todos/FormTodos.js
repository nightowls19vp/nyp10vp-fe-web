import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { createAxios } from "../../../http/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

import * as CustomComponent from "../../../component/custom/CustomComponents";
import { postPackageTodos } from "../../../redux/packageRequest";
import {
  updateMessage,
  updateOpenSnackbar,
  updateStatus,
} from "../../../redux/messageSlice";
import { Colors } from "../../../config/Colors";
import "../../../assets/css/Todos.scss";

function FormTodos({ todoID, handleClose }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("Public");
  const [listTodo, setListTodo] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleAddTodo = () => {
    if (todo.length <= 0) {
      setMsg("Vui lòng điền vào mục CÔNG VIỆC");
    } else {
      let newArray = [...listTodo];
      let formTodo = {
        todo: todo,
        description: description,
        isComplete: false,
      };
      newArray.push(formTodo);
      setListTodo(newArray);
      setTodo("");
      setDescription("");
    }
  };

  const handleIsComplete = (e, idx) => {
    let newArray = [...listTodo];
    for (let i = 0; i < newArray.length; i++) {
      if (i === idx) {
        newArray[i].isComplete = !newArray[i].isComplete;
      }
    }
    setListTodo(newArray);
  };

  const handleDeleteTodo = (e, idx) => {
    let todos = [...listTodo];
    let newArray = [];
    for (let i = 0; i < todos.length; i++) {
      if (i !== idx) {
        newArray.push(todos[i]);
      }
    }
    setListTodo(newArray);
  };

  const handleAddTodos = async () => {
    if (name.length <= 0) {
      setMsg("Vui lòng điền vào mục TIÊU ĐỀ!");
      return;
    }

    let formData = {
      summary: name,
      todos: listTodo,
      state: status,
    };

    setFlag(true);

    const res = await postPackageTodos(
      todoID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      setFlag(false);
      if (res?.statusCode === 201) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Thêm 1 việc cần làm thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Thêm 1 việc cần làm thất bại!"));
      }
    }

    handleClose();
  };

  useEffect(() => {
    if (todo) {
      setMsg("");
    }
  }, [todo]);

  return (
    <Stack
      spacing={2}
      sx={{ position: "relative", opacity: flag === true ? 0.75 : 1 }}
    >
      <Box
        className="title-group-spending"
        sx={{ justifyContent: "space-between" }}
      >
        <Input
          placeholder="Tiêu đề"
          value={name}
          fontSize={20}
          className="name-bill"
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          labelId="demo-simple-select-todos"
          className="demo-simple-todos"
          value={status}
          onChange={handleChangeStatus}
        >
          <MenuItem value={"Public"}>Mọi người</MenuItem>
          <MenuItem value={"Private"}>Chỉ mình tôi</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <TextField
          label="Công việc"
          variant="outlined"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          sx={{ margin: "5px", width: { xs: "100%", md: "50%" } }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <TextField
            label="Mô tả"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ margin: "5px" }}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ height: "56px" }}
            onClick={handleAddTodo}
          >
            Thêm
          </Button>
        </Box>
      </Box>
      <Typography className="todo-msg">{msg}</Typography>

      {listTodo.length > 0 && listTodo !== null ? (
        <Stack spacing={2} sx={{ width: "100%"}}>
          <Typography>Danh sách việc đã thêm</Typography>
          {listTodo.map((todo, idx) => (
            <Box className="list-todo" key={idx}>
              <Box>
                <Box className="todos">
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={(e) => handleIsComplete(e, idx)}
                  />
                  <Typography>{todo.todo}</Typography>
                </Box>
                <Typography className="text-todo">
                  {todo.description}
                </Typography>
              </Box>
              <IconButton onClick={(e) => handleDeleteTodo(e, idx)}>
                <BackspaceIcon sx={{ color: Colors.error }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
      ) : null}
      {listTodo.length > 0 && listTodo !== null ? (
        <CustomComponent.Button1 fullWidth onClick={handleAddTodos}>
          Lưu
        </CustomComponent.Button1>
      ) : null}

      {flag && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
}

export default FormTodos;
