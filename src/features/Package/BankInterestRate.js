import React, { useState } from "react";

import {
  Box,
  InputAdornment,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import CurrencyInput from "react-currency-input-field";
import DateTimePicker from "../../component/Date/DateTimePicker";
import "../../assets/css/InterestBank.scss";

function BankInterestRate() {
  const nowDate = new Date();
  const [price, setPrice] = useState(1000);
  const [date, setDate] = useState(nowDate);
  const [interest, setInterest] = useState();
  const [duration, setDuration] = useState();
  const [dateExpire, setDateExpire] = useState();
  // const [moneyInterest, setMoneyIntterest] = useState();
  // const [total, setTotal] = useState();
  // const [newInterest, setNewInterest] = useState();
  // const [newDuration, setNewDuration] = useState();
  // const [newTotal, setNewTotal] = useState();
  // const [totalExpire, setTotalExpire] = useState();
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenExpire, setIsOpenExpire] = useState(false);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  return (
    <Stack spacing={2} className="interest-rate">
      <Typography className="title">Lãi suất ngân hàng</Typography>
      <Typography className="summary">
        Công cụ tính lãi suất tiết kiệm ngân hàng giúp bạn dễ dàng biết được số
        tiền lãi trong tương lai. Từ đó có thể so sánh các mức lãi suất ngân
        hàng, kỳ hạn gửi và đưa ra quyết định có lợi nhất cho mình.
      </Typography>
      <Box>
        <Typography>Số tiền gửi</Typography>
        <CurrencyInput
          id="input-example"
          className="currency-input"
          value={price}
          decimalsLimit={2}
          onValueChange={(value) => setPrice(value)}
        />
      </Box>
      <Box>
        <Stack spacing={1.5}>
          <Box>
            <Typography>Ngày gửi</Typography>
            <DateTimePicker
              valueDay={date}
              handleDateTimePicker={handleDateTimePicker}
              sizeDateTime={"medium"}
            />
          </Box>
          <Box>
            <Typography>Kỳ hạn hiện tại</Typography>
            <TextField
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">tháng</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Typography>Lãi suất tiền gửi</Typography>
            <TextField
              fullWidth
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%/năm</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Typography>Ngày đáo hạn</Typography>
            <Typography>{dateExpire}</Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default BankInterestRate;
