import React, { useState } from "react";

import { Box, Input, Stack, Typography } from "@mui/material";
import DateTimePicker from "../../../component/Date/DateTimePicker";

function FormFunding() {
  const nowDate = new Date();
  const [name, setName] = useState("");
  const [date, setDate] = useState(nowDate);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };
  return (
    <Stack spacing={2} className="form-group-funding">
      <Input
        placeholder="Tiêu đề"
        value={name}
        fontSize={20}
        className="name-bill"
        onChange={(e) => setName(e.target.value)}
      />
      <Box>
        <Typography>Ngày bắt đầu</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>
    </Stack>
  );
}

export default FormFunding;
