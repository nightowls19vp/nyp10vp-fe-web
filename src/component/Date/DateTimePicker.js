import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateTimePicker({ valueDay, handleDateTimePicker }) {
  const [dateTime, setDateTime] = React.useState(
    valueDay === null ? null : dayjs(valueDay)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{ textField: { size: "small" } }}
        value={dateTime}
        onChange={(newValue) => {
          setDateTime(newValue);
          handleDateTimePicker(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
