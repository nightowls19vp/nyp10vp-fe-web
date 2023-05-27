import { Button, OutlinedInput, styled, ButtonBase, Switch, TextField } from "@mui/material";

import { Colors } from "../../config/Colors";

export const ButtonNoti = styled(Button) ({
  backgroundColor: Colors.background,
  color: Colors.black,
  textTransform: "lowercase",
  '&:hover': {
    backgroundColor: Colors.search,
  },
});

export const GroupChat = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  position: 'relative',
  height: '50px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#e6e6e6',
    // borderColor: '#0062cc',
    // boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ffdfb3',
    // borderColor: '#005cbf',
  },
  '&:focus': {
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    backgroundColor: '#ffdfb3',
  },
});

export const Button1 = styled(Button) ({
  backgroundColor: Colors.btnFill,
  color: Colors.background,
  '&:hover': {
    backgroundColor: Colors.primary,
  },
  borderRadius: '10px',
});

export const Button2 = styled(Button) ({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.btnFill,
  color: Colors.btnFill,
  '&:hover': {
    backgroundColor: Colors.btnOutline,
    border: "2px solid",
  },
  borderRadius: '10px',
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
  top: 120,
  bottom: 0,
  [theme.breakpoints.down('md')]: {
    top: 100,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
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

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const CssTextField = styled(TextField)({
  backgroundColor: '#ffffff',
  minWidth: '20px',
  width: '60px',
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B2BAC2',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});