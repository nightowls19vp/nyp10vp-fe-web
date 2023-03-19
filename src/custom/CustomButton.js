import { Button, styled } from "@mui/material";

export const ButtonLogin = styled(Button) ({
  backgroundColor: '#EDDC98',
  color: '#000000',
  '&:hover': {
    backgroundColor: '#e4cb67',
  }
});

export const ButtonRegister = styled(Button) ({
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