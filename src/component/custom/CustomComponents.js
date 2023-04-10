import { Button, TextField, styled } from "@mui/material";

import { Colors } from "../../config/Colors";

export const Button1 = styled(Button) ({
  backgroundColor: Colors.btnFill,
  color: Colors.background,
  '&:hover': {
    backgroundColor: Colors.primary,
  }
});

export const Button2 = styled(Button) ({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.btnFill,
  color: Colors.btnFill,
  '&:hover': {
    backgroundColor: Colors.btnOutline,
    border: "2px solid",
  }
});

export const TextFieldInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: '#005ce6',
    },
  },
});