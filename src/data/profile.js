import {
  BsPersonBoundingBox,
  BsFillLockFill,
  BsFillInfoSquareFill,
} from "react-icons/bs";
import { TbPackage, TbSettings, TbLogout } from "react-icons/tb";

import PersonalInformation from "../features/Profile/PersonalInformation";
import ChangePassword from "../features/Profile/ChangePassword";

const profile = [
  {
    id: 1,
    icon: <BsPersonBoundingBox size={20} />,
    name: "Thông tin cá nhân",
    action: <PersonalInformation />,
  },
  {
    id: 2,
    icon: <BsFillLockFill size={20} />,
    name: "Đổi mật khẩu",
    action: <ChangePassword />,
  },
  {
    id: 3,
    icon: <BsFillInfoSquareFill size={20} />,
    name: "Thông tin & quyền",
    action: "information&Rights",
  },
  {
    id: 4,
    icon: <TbPackage size={20} />,
    name: "Tùy chọn quảng cáo",
    action: "advertisement",
  },
  {
    id: 5,
    icon: <TbPackage size={20} />,
    name: "Gói của tôi",
    action: "myPackage",
  },
  {
    id: 6,
    icon: <TbSettings size={20} />,
    name: "Cài đặt thông báo",
    action: "settings",
  },
  {
    id: 7,
    icon: <TbLogout size={20} />,
    name: "logout",
  },
];

export default profile;
