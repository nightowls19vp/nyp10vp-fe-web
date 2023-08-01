import React, { useState } from "react";

import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextFieldCustom from "../../component/text-field/TextFieldCustom";
import * as CustomComponent from "../../component/custom/CustomComponents";

function BankInterestRate() {
  const [price, setPrice] = useState();
  const [interest, setInterest] = useState();
  const [duration, setDuration] = useState();
  const ChangeValue = (value) => {
    setPrice(value);
  };
  return (
    <Stack spacing={2} className="interest-rate">
      <Typography className="title">Lãi suất ngân hàng</Typography>
      <Typography className="summary">
        Công cụ tính lãi suất tiết kiệm ngân hàng giúp bạn dễ dàng biết được số
        tiền lãi trong tương lai. Từ đó có thể so sánh các mức lãi suất ngân
        hàng, kỳ hạn gửi và đưa ra quyết định có lợi nhất cho mình.
      </Typography>
      <Box
        className="box-interest-rate"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
        }}
      >
        <Box
          className="box-textfield"
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography className="title-textfield">Số tiền gửi</Typography>
          <Box sx={{ minWidth: "270px" }}>
            <TextFieldCustom
              labelText={""}
              sizeText={"medium"}
              ChangeValue={ChangeValue}
            />
          </Box>
        </Box>
        <Box
          className="box-textfield"
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography className="title-textfield">Lãi suất gửi</Typography>
          <TextField
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%/năm</InputAdornment>
              ),
            }}
            sx={{ minWidth: "270px" }}
          />
        </Box>
      </Box>
      <Box
        className="box-interest-rate"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Box
          className="box-textfield"
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Typography className="title-textfield">Kỳ hạn gửi</Typography>
          <TextField
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">tháng</InputAdornment>
              ),
            }}
            sx={{ minWidth: "270px" }}
          />
        </Box>
        <Box className="box-textfield">
          <CustomComponent.Button1>Thực hiện</CustomComponent.Button1>
        </Box>
      </Box>
    </Stack>
  );
}

export default BankInterestRate;
