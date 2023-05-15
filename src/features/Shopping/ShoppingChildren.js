import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userCheckout } from "../../redux/userRequest";

function createData(id, name, quantity, money) {
  return {
    id,
    name,
    quantity,
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
            <TableSortLabel
            //   active={orderBy === headCell.id}
            >
              {headCell.label}
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
      ) : // <Typography
      //   sx={{ flex: "1 1 100%" }}
      //   variant="h6"
      //   id="tableTitle"
      //   component="div"
      // >

      // </Typography>
      null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ item }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const rows = item.map((row) =>
    createData(row.package, row.name, row.quantity, 1)
  );
  const [selected, setSelected] = React.useState([]);
  // const [dense, setDense] = React.useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      // console.log(newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    // const selectedIndex = selected.filter(row);
    // console.log(selectedIndex);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, row);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
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
            !(data.id === row.id &&
            data.quantity === row.quantity &&
            data.money === row.money)
        ),
      ];
    } else {
      newSelected = newSelected.concat(selected, row);
    }

    setSelected(newSelected);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

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

  const handleButtonCheckout = async () => {
    let formData = [];
    for (let el1 of selected) {
      for (let el2 of item) {
        if (el1 === el2.package) {
          // delete el2.name;
          formData.push(el2);
        }
      }
    }
    let data = {
      cart: formData,
    };
    console.log(data);
    // const res = userCheckout(user?.data.userInfo._id, user?.accessToken, data);
    // console.log(res);
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
                      key={row.id}
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
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.money}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
      </Box>
      <Button onClick={handleButtonCheckout}> Thanh toán </Button>
    </Stack>
  );
}
