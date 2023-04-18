import { Button, OutlinedInput, styled } from "@mui/material";

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

export const PasswordInput = styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2),
  },
  '& .MuiOutlinedInput-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
  },
}));