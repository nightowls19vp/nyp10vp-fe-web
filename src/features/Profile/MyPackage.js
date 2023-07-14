import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TablePagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";

import { Colors } from "../../config/Colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
}));

function MyPackage() {
  const packages = useSelector((state) => state?.package?.myPackages);

  const [pkgSU, setPkgSU] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pkgSU.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (packages.length > 0) {
      let packageSuperUser = [];

      for (let pkgs of packages) {
        let i = pkgs._id;
        for (let pkg of pkgs.packages) {
          let j = 0;
          let formData = {
            _id: i+j,
            name: pkg.package.name,
            duration: pkg.package.duration,
            price: pkg.package.price,
            noOfMember: pkg.package.noOfMember,
            createdAt: pkg.package.createdAt,
            updatedAt: pkg.package.updatedAt,
          };
          packageSuperUser.push(formData);
          j++;
        }
      }

      setPkgSU(packageSuperUser);
    } else {
      setPkgSU([]);
    }
  }, [packages]);

  return (
    <Stack paddingX={"20px"}>
      <Typography
        variant="button"
        display="block"
        fontSize={18}
        color={Colors.textPrimary}
        gutterBottom
      >
        Lịch sử mua gói
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {pkgSU.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%" }}>Tên gói (đã mua)</TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    Số thành viên (người)
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    Giá tiền (đồng)
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30%" }}>
                    Ngày mua
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? pkgSU.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : pkgSU
                ).map((pkg) => (
                  <StyledTableRow
                    key={pkg._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {pkg.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {pkg.noOfMember}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {pkg.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {pkg.createdAt}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                    ]}
                    labelRowsPerPage="Số hàng trên trang"
                    count={pkgSU.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : null}
      </Box>
    </Stack>
  );
}

export default MyPackage;
