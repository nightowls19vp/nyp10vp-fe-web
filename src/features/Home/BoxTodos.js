import React from "react";

import { Box, Checkbox, Stack, Typography } from "@mui/material";
import Carousel from "better-react-carousel";
import "../../assets/css/Home.scss";
import { useSelector } from "react-redux";

function BoxTodos({ title, status1, name1, status2, name2, name3 }) {
  const homeTodos = useSelector((state) => state?.home.homeTodos);
  return (
    <Carousel cols={2} rows={1} gap={10} loop>
      {homeTodos.map((todo, idx) =>
        todo ? (
          <Carousel.Item key={idx}>
            <Stack
              spacing={1}
              className="home-box-3-left"
            >
              <Typography sx={{ fontSize: "25px", fontWeight: 550 }}>
                {todo.summary}
              </Typography>
              {todo.todos.map((t) =>
                t ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    key={t._id}
                  >
                    <Checkbox checked={t.isCompleted} />
                    <Typography>{t.todo}</Typography>
                  </Box>
                ) : null
              )}
            </Stack>
          </Carousel.Item>
        ) : null
      )}
    </Carousel>
  );
}

export default BoxTodos;
