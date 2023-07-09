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
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

import { createAxios } from "../../../http/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

import * as CustomComponent from "../../../component/custom/CustomComponents";
import { postPackageTodos } from "../../../redux/packageRequest";

function FormTodos({ todoID }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("Public");
  const [listTodo, setListTodo] = useState([]);

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
    let formData = {
      summary: name,
      todos: listTodo,
      state: status
    };
    
    await postPackageTodos(
      todoID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  useEffect(() => {
    if (todo) {
      setMsg("");
    }
  }, [todo]);

  return (
    <Stack spacing={2}>
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
        <Stack spacing={2}>
          <Typography>Danh sách việc đã thêm</Typography>
          {listTodo.map((todo, idx) => (
            <Box key={idx} className="box-todo">
              <Box className="title-group-spending">
                <Checkbox
                  checked={todo.isComplete}
                  onChange={(e) => handleIsComplete(e, idx)}
                />
                <Typography>{todo.todo}</Typography>
              </Box>
              <IconButton onClick={(e) => handleDeleteTodo(e, idx)}>
                <BackspaceIcon sx={{ color: "#ff3333" }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
      ) : null}
      <CustomComponent.Button1 fullWidth onClick={handleAddTodos}>
        Hoàn thành
      </CustomComponent.Button1>
    </Stack>
  );
}

export default FormTodos;
