import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateTimePicker({ handleDateTimePicker }) {
  const [dateTime, setDateTime] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dateTime}
        onChange={(newValue) => {
          setDateTime(newValue);
          handleDateTimePicker(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
