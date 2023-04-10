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
  },
  {
    id: 2,
    icon: <BsFillLockFill />,
    name: "Đổi mật khẩu",
  },
  {
    id: 3,
    icon: <BsFillInfoSquareFill />,
    name: "Thông tin & quyền",
  },
  {
    id: 4,
    icon: <TbPackage />,
    name: "Tùy chọn quảng cáo",
  },
  {
    id: 5,
    icon: <TbPackage />,
    name: "Gói của tôi",
  },
  {
    id: 6,
    icon: <TbSettings />,
    name: "Cài đặt thông báo",
  },
  {
    id: 7,
    icon: <TbLogout />,
    name: "Đăng xuất",
  },
];

export default profile;
