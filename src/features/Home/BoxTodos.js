import React from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "better-react-carousel";
import "../../assets/css/Home.scss";
import { useSelector } from "react-redux";

function BoxTodos() {
  const homeTodos = useSelector((state) => state?.home.homeTodos);
  return (
    <Carousel cols={3} rows={1} gap={10} loop>
      {homeTodos.map((todo, idx) =>
        todo ? (
          <Carousel.Item key={idx}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader title={todo.summary} />
              <CardContent>
                {todo.todos.map((t, idx) =>
                  t && idx < 3 ? (
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
              </CardContent>
              <CardActions>
                <Button>Xem thêm</Button>
              </CardActions>
            </Card>
          </Carousel.Item>
        ) : null
      )}
    </Carousel>
  );
}

export default BoxTodos;
