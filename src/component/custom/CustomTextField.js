import { TextField, styled } from "@mui/material";

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

export const TextFieldSearch = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff',
    },
  },
});
