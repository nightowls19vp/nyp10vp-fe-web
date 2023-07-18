import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import { getProductItemsByStorage } from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.textPrimary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  ":hover": {
    backgroundColor: Colors.btnOutline,
  },
}));

function createData(id, name, quantity, unit, money, exp) {
  return { id, name, quantity, unit, money, exp };
};

function ListItemProduct({ item, p, grId, storageID }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const rows = item.map((row) =>
    createData(
      row.id,
      row.groupProduct.name,
      row.quantity,
      row.unit,
      row.groupProduct.price,
      row.bestBefore
    )
  );

  const [page, setPage] = useState(p.currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = async (event, newPage) => {
    let currentPage = newPage;
    await getProductItemsByStorage(
      grId,
      currentPage+1,
      rowsPerPage,
      storageID,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    let limit = parseInt(event.target.value, 10);
    await getProductItemsByStorage(
      grId,
      1,
      limit,
      storageID,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    setRowsPerPage(limit);
    setPage(0);
  };

  const handleClick = (e, productID) => {
    navigate(`/stock/product-item?grId=${grId}&storageId=${storageID}&productId=${productID}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên sản phẩm</StyledTableCell>
            <StyledTableCell align="right">Số lượng</StyledTableCell>
            <StyledTableCell align="right">Giá tiền (vnd)</StyledTableCell>
            <StyledTableCell align="right">Hạn sử dụng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{
                cursor: "pointer",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
              onClick={(e) => handleClick(e, row.id)}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.quantity} chai
              </StyledTableCell>
              <StyledTableCell align="right">70.000</StyledTableCell>
              <StyledTableCell align="right">{row.exp}</StyledTableCell>
            </StyledTableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 55 }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Số hàng trên trang"
              count={p.totalItems}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default ListItemProduct;
