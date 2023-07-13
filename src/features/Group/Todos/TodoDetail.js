import React, { useEffect, useState } from "react";

import {
  Stack,
  Tab,
  Tabs,
  Box,
  Checkbox,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { createAxios } from "../../../http/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateIsCompletedTodo } from "../../../redux/packageRequest";
import { updateTodos } from "../../../redux/packageSlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TodoDetail({ grID, item }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [value, setValue] = React.useState(0);
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [listTodo, setListTodo] = useState(item?.todos);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTodo = async () => {
    if (todo.length <= 0) {
      setMsg("Vui lòng điền vào mục CÔNG VIỆC");
    } else {
      let formTodo = {
        todo: todo,
        description: description,
        isCompleted: false,
      };
      let todos = [];
      todos.push(formTodo);
      let formData = {
        todos: todos,
        state: item.state
      };
      await addTodo(grID, item._id, formData, user?.accessToken, dispatch, axiosJWT);
      setTodo("");
      setDescription("");
    }
  };

  const handleIsCompleted = async (e, idx) => {
    let newArray = [...listTodo];
    let newTodo = [];
    let formTodo = {};
    let todo_id = "";
    for (let i = 0; i < newArray.length; i++) {
      let formData = { ...newArray[i] };
      if (i === idx) {
        formData = {
          ...newArray[i],
          isCompleted: !newArray[i].isCompleted,
        };
        todo_id = newArray[i]._id;
        formTodo = {
          todo: newArray[i].todo,
          description: newArray[i].description,
          isCompleted: !newArray[i].isCompleted,
        };
      }
      newTodo.push(formData);
    }
    
    const res = await updateIsCompletedTodo(
      item._id,
      todo_id,
      formTodo,
      user?.accessToken,
      axiosJWT
    );
    if (res?.statusCode === 200) {
      setListTodo(newTodo);
    }
    else {
      setListTodo(newArray);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
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

      <CustomTabPanel value={value} index={0}>
        {listTodo.length > 0 &&
          listTodo !== null &&
          listTodo.map((todo, idx) => (
            <Box className="title-group-spending" key={idx}>
              <Checkbox
                checked={todo.isCompleted}
                onChange={(e) => handleIsCompleted(e, idx)}
              />
              <Typography
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.todo}
              </Typography>
            </Box>
          ))}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {listTodo.length > 0 &&
          listTodo !== null &&
          listTodo.map(
            (todo, idx) =>
              todo.isCompleted === false && (
                <Box className="title-group-spending" key={idx}>
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={(e) => handleIsCompleted(e, idx)}
                  />
                  <Typography
                    sx={{
                      textDecoration: todo.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {todo.todo}
                  </Typography>
                </Box>
              )
          )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {listTodo.length > 0 &&
          listTodo !== null &&
          listTodo.map(
            (todo, idx) =>
              todo.isCompleted && (
                <Box className="title-group-spending" key={idx}>
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={(e) => handleIsCompleted(e, idx)}
                  />
                  <Typography>{todo.todo}</Typography>
                </Box>
              )
          )}
      </CustomTabPanel>
    </Stack>
  );
}

export default TodoDetail;
