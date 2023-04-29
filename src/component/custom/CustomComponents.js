import { Button, OutlinedInput, styled, ButtonBase } from "@mui/material";

import { Colors } from "../../config/Colors";

export const Button1 = styled(Button) ({
  backgroundColor: Colors.btnFill,
  color: Colors.background,
  '&:hover': {
    backgroundColor: Colors.primary,
  },
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

export const ButtonAvatar = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  borderRadius: '50%',
  width: '180px',
  height: '180px',
  [theme.breakpoints.down('md')]: {
    width: '120px !important', // Overrides inline-style
    height: '120px',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0.15,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

export const ImageSrc = styled('span')({
  position: 'absolute',
  borderRadius: '50%',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

export const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // backgroundColor: theme.palette.common.white,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

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