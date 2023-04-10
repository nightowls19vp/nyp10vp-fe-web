import { Button, TextField, styled } from "@mui/material";

export const Button1 = styled(Button) ({
  backgroundColor: '#ffaa33',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#f58f00',
  }
});

export const Button2 = styled(Button) ({
  backgroundColor: '#6750A4',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#403267',
  }
});

export const ButtonLoginWith = styled(Button) ({
  backgroundColor: '#ffffff',
  color: '#000000',
  '&:hover': {
    borderColor: '#0066ff',
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