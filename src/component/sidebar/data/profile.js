import {
  BsPersonBoundingBox,
  BsFillLockFill,
  BsFillInfoSquareFill,
} from "react-icons/bs";

import { TbPackage, TbSettings, TbLogout } from "react-icons/tb";

const profile = [
  {
    id: 1,
    icon: <BsPersonBoundingBox />,
    name: "Thông tin cá nhân",
    action: "personnalInfomation",
  },
  {
    id: 2,
    icon: <BsFillLockFill />,
    name: "Đổi mật khẩu",
    action: "changePassword",
  },
  {
    id: 3,
    icon: <BsFillInfoSquareFill />,
    name: "Thông tin & quyền",
    action: "information&Rights",
  },
  {
    id: 4,
    icon: <TbPackage />,
    name: "Tùy chọn quảng cáo",
    action: "advertisement",
  },
  {
    id: 5,
    icon: <TbPackage />,
    name: "Gói của tôi",
    action: "myPackage",
  },
  {
    id: 6,
    icon: <TbSettings />,
    name: "Cài đặt thông báo",
    action: "settings",
  },
  {
    id: 7,
    icon: <TbLogout />,
    name: "logout",
  },
];

export default profile;
