import { Box, Button, TextField } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Colors } from "../../config/Colors";

const locales = {
  vi: require("date-fns/locale/vi"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 6, 0),
    end: new Date(2023, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2023, 6, 20),
    end: new Date(2023, 6, 23),
  },
];

const CalendarComponent = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App">
      <h2>Thêm sự kiện mới</h2>
      <div>
        <input
          type="text"
          placeholder="Tiêu đề"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Ngày bắt đầu"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="Ngày kết thúc"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Thêm sự kiện
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px", }}
      />
    </div>
  );
};

export default CalendarComponent;
