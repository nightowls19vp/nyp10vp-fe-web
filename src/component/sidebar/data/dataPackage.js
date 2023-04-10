import { TbPackages, TbPackage, TbShoppingBag } from "react-icons/tb";
import { BsEnvelopePaper } from "react-icons/bs";

const dataPackage = [
  {
    id: 1,
    icon: <TbPackages />,
    title: "CÁC GÓI NGƯỜI DÙNG",
    status: true,
    child: [
      {
        id: 11,
        icon: <TbPackage />,
        name: "Gói 1",
      },
      {
        id: 12,
        icon: <TbPackage />,
        name: "Gói 2",
      },
      {
        id: 13,
        icon: <TbPackage />,
        name: "Gói 3",
      },
    ],
  },
  {
    id: 2,
    icon: <TbShoppingBag />,
    title: "CÁC TIỆN ÍCH",
    status: false,
    child: [
      {
        id: 21,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 1",
      },
      {
        id: 22,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 2",
      },
      {
        id: 23,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 3",
      },
    ],
  },
];

export default dataPackage;
