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
  FormControlLabel,
  Tooltip,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, userCheckout } from "../../redux/userRequest";
import { useNavigate } from "react-router-dom";

import { createAxios } from "../../http/createInstance.js";

import "../../assets/css/Shopping.scss";
import { loginSuccess } from "../../redux/authSlice";
import { getUserCart } from "../../redux/packageRequest";

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
  //   orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

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
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const order = useSelector((state) => state.auth.order);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

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
  // const [dense, setDense] = React.useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      console.log(newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const delay = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  function task(i) {
    setTimeout(async function () {
      const res = await getUserById(user?.data.userInfo._id, user?.accessToken, axiosJWT);
      console.log(res.user.trxHist);
      if (res.user.trxHist.length > 0) {
        i = 10;
      }
    }, 5000 * i);
  }

  const handleButtonCheckout = async () => {
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

    await userCheckout(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      data,
      axiosJWT
    );
    window.open(order.order_url);
    
    let i = 0;
    while (i < 20) {
      task(i);
      i++;
    }

    await getUserCart(
      user?.data.userInfo._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
  };

  return (
    <Stack>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                //   orderBy={orderBy}
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
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
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
                        <Box className="quantity">
                          <IconButton>
                            <CiSquareMinus />
                          </IconButton>
                          <Typography variant="subtitle1" fontSize={18}>
                            {row.quantity}
                          </Typography>
                          <IconButton>
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
      <Button onClick={handleButtonCheckout}> Thanh toán </Button>
    </Stack>
  );
}
