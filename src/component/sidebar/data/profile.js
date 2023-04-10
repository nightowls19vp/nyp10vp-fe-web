import {
  BsPersonBoundingBox,
  BsFillLockFill,
  BsFillInfoSquareFill,
} from "react-icons/bs";

import { TbPackage, TbSettings, TbLogout } from "react-icons/tb";

const profile = [
  {
    icon: <BsPersonBoundingBox />,
    name: "Thông tin cá nhân",
  },
  {
    icon: <BsFillLockFill />,
    name: "Đổi mật khẩu",
  },
  {
    icon: <BsFillInfoSquareFill />,
    name: "Thông tin & quyền",
  },
  {
    icon: <TbPackage />,
    name: "Tùy chọn quảng cáo",
  },
  {
    icon: <TbPackage />,
    name: "Gói của tôi",
  },
  {
    icon: <TbSettings />,
    name: "Cài đặt thông báo",
  },
  {
    icon: <TbLogout />,
    name: "Đăng xuất",
  },
];

export default profile;
