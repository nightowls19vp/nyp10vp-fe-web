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