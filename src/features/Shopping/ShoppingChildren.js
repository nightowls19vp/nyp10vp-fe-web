import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Stack,
  CircularProgress,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import {
  getInformationUser,
  getUserById,
  userCheckout,
} from "../../redux/userRequest";
import { useNavigate } from "react-router-dom";

import { createAxios } from "../../http/createInstance.js";

import "../../assets/css/Shopping.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { loginSuccess } from "../../redux/authSlice";
import { getUserCart, updateUserCart } from "../../redux/packageRequest";
import { setCarts, updateNumberCart } from "../../redux/packageSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #d9d9d9",
  boxShadow: 24,
  p: 4,
};

const styleProgress = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};

function createData(id, name, quantity, member, duration, money) {
  return {
    id,
    name,
    quantity,
    member,
    duration,
    money,
  };
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Các gói người dùng",
  },
  {
    id: "member",
    numeric: true,
    disablePadding: false,
    label: "Số thành viên",
  },
  {
    id: "duration",
    numeric: true,
    disablePadding: false,
    label: "Thời gian",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Số lượng",
  },
  {
    id: "money",
    numeric: true,
    disablePadding: false,
    label: "Giá tiền",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel>
              <Typography variant="subtitle2" fontSize={18}>
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, data, arrSelected, onSetSelected } = props;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleButtonDelete = async () => {
    let shoppingCart = [];
    for (let ele of data) {
      let formData = {
        package: ele.id,
        quantity: ele.quantity,
        noOfMember: ele.member,
        duration: ele.duration,
      };
      shoppingCart.push(formData);
    }

    let newSelected = [];

    for (let ele of arrSelected) {
      shoppingCart = [
        ...shoppingCart.filter(
          (data) =>
            data.package !== ele.id ||
            data.noOfMember !== ele.member ||
            data.duration !== ele.duration
        ),
      ];
    }

    let formCart = {
      cart: shoppingCart,
    };

    const res = await updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      axiosJWT
    );
    console.log(res);

    if (res.statusCode === 200) {
      onSetSelected(newSelected);
    }

    await getUserCart(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Có {numSelected} sự lựa chọn
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleButtonDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  arrSelected: PropTypes.array.isRequired,
  onSetSelected: PropTypes.func.isRequired,
};

export default function EnhancedTable({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.user?.userInfo);
  const order = useSelector((state) => state.auth.order);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [openModal, setOpenModal] = React.useState(false);
  const [openProgress, setOpenProgress] = React.useState(false);
  const handleClose = () => setOpenModal(false);

  const rows = item.map((row) =>
    createData(
      row._id,
      row.name,
      row.quantity,
      row.noOfMember,
      row.duration,
      row.price
    )
  );

  const [selected, setSelected] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      let totalSelected = 0;
      newSelected.map((n) => (totalSelected += n.money));
      setTotal(totalSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
    setTotal(0);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.some((element) => {
      if (
        element.id === row.id &&
        element.quantity === row.quantity &&
        element.money === row.money
      ) {
        return true;
      }
      return false;
    });

    let newSelected = [];

    if (selectedIndex) {
      newSelected = [
        ...selected.filter(
          (data) =>
            !(
              data.id === row.id &&
              data.quantity === row.quantity &&
              data.money === row.money
            )
        ),
      ];
    } else {
      newSelected = newSelected.concat(selected, row);
    }

    let totalSelected = 0;
    newSelected.map((n) => (totalSelected += n.money));
    setTotal(totalSelected);

    setSelected(newSelected);
  };

  const isSelected = (name) => {
    for (let element of selected) {
      if (
        element.id === name.id &&
        element.quantity === name.quantity &&
        element.money === name.money
      ) {
        return true;
      }
    }
    return false;
  };

  const handleButtonMinus = (event, row) => {
    let shoppingCart = [];
    for (let ele of item) {
      let formData = {
        description: ele.description,
        duration: ele.duration,
        name: ele.name,
        noOfMember: ele.noOfMember,
        price: ele.price,
        quantity: ele.quantity,
        _id: ele._id,
      };
      if (
        formData._id === row.id &&
        formData.noOfMember === row.member &&
        formData.duration === row.duration
      ) {
        formData.quantity -= 1;
      }
      if (formData.quantity > 0) {
        shoppingCart.push(formData);
      } else {
        dispatch(updateNumberCart(item.length - 1));
      }
    }

    dispatch(setCarts(shoppingCart));
  };

  const handleButtonPlus = (event, row) => {
    let shoppingCart = [];
    for (let ele of item) {
      let formData = {
        description: ele.description,
        duration: ele.duration,
        name: ele.name,
        noOfMember: ele.noOfMember,
        price: ele.price,
        quantity: ele.quantity,
        _id: ele._id,
      };
      if (
        formData._id === row.id &&
        formData.noOfMember === row.member &&
        formData.duration === row.duration
      ) {
        formData.quantity += 1;
      }
      shoppingCart.push(formData);
    }

    dispatch(setCarts(shoppingCart));
  };

  function task(i) {
    setTimeout(async function () {
      await getInformationUser(
        user?.data.userInfo._id,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
      if (userInfo.user.trxHist.length > 0) {
        console.log("vy");
      }
    }, 5000 * i);
  }

  const handleButtonCheckout = async () => {
    if (selected.length === 0) {
      setOpenModal(true);
      return;
    }
    let shoppingCart = [];
    for (let ele of item) {
      let formData = {
        package: ele._id,
        quantity: ele.quantity,
        noOfMember: ele.noOfMember,
        duration: ele.duration,
      };
      shoppingCart.push(formData);
    }
    let formCart = {
      cart: shoppingCart,
    };
    await updateUserCart(
      user?.data.userInfo._id,
      formCart,
      user?.accessToken,
      axiosJWT
    );

    let cart = [];
    for (let el of selected) {
      let formData = {
        package: el.id,
        quantity: el.quantity,
        noOfMember: el.member,
        duration: el.duration,
      };
      cart.push(formData);
    }
    let data = {
      cart: cart,
    };

    // await userCheckout(
    //   user?.accessToken,
    //   dispatch,
    //   data,
    //   axiosJWT
    // );

    // window.open(order.order_url);

    let i = 0;
    while (i < 5) {
      task(i);
      if (userInfo.user.trxHist.includes("230522_014234304")) {
        console.log("1");
        return;
      }
      i++;
    }

    // await getUserCart(
    //   user?.data.userInfo._id,
    //   user?.accessToken,
    //   dispatch,
    //   axiosJWT
    // );
  };

  const onSetSelected = (arr) => {
    setSelected(arr);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", paddingY: "30px" }}>
      <Box sx={{ width: "70%" }}>
        <Stack>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              {selected.length > 0 ? (
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  data={rows}
                  arrSelected={selected}
                  onSetSelected={onSetSelected}
                />
              ) : null}
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {rows.map((row, index) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          // onClick={(event) => handleClick(event, row)}
                          // role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.member} người
                          </TableCell>
                          <TableCell align="center">
                            {row.duration} tháng
                          </TableCell>
                          <TableCell align="center">
                            <Box className="quantity">
                              <IconButton
                                onClick={(event) =>
                                  handleButtonMinus(event, row)
                                }
                              >
                                <CiSquareMinus />
                              </IconButton>
                              <Typography variant="subtitle1" fontSize={18}>
                                {row.quantity}
                              </Typography>
                              <IconButton
                                onClick={(event) =>
                                  handleButtonPlus(event, row)
                                }
                              >
                                <CiSquarePlus />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="center">{row.money}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ width: "30%" }} className="method-total">
        <Stack spacing={2}>
          <FormControl>
            <FormLabel id="radio-buttons-method-total">
              Chọn phương thức thanh toán
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="zalo"
              name="radio-buttons-group"
            >
              <FormControlLabel value="zalo" control={<Radio />} label="Zalo" />
              <FormControlLabel value="momo" control={<Radio />} label="Momo" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <Box className="total">
            <Typography variant="subtitle2">
              Tổng thanh toán ({selected.length} sản phẩm):
            </Typography>
            <Typography
              variant="subtitle2"
              color={"#ff3333"}
              paddingLeft={"2px"}
            >
              {total}đ
            </Typography>
          </Box>
          <Box align="right">
            <CustomComponent.Button1 onClick={handleButtonCheckout}>
              Thanh toán
            </CustomComponent.Button1>
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h5" gutterBottom>
                  Bạn vẫn chưa chọn sản phẩm để mua
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Stack>
      </Box>
      {openProgress ? (
        <Box sx={styleProgress}>
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
}
