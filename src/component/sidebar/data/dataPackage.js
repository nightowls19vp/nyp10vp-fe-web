import { TbPackages, TbPackage, TbShoppingBag } from "react-icons/tb";
import { BsEnvelopePaper } from "react-icons/bs";

const dataPackage = [
  {
    icon: <TbPackages />,
    title: "CÁC GÓI NGƯỜI DÙNG",
    status: true,
    child: [
      {
        id: 1,
        icon: <TbPackage />,
        name: "Gói 1",
      },
      {
        id: 2,
        icon: <TbPackage />,
        name: "Gói 2",
      },
      {
        id: 3,
        icon: <TbPackage />,
        name: "Gói 3",
      },
    ],
  },
  {
    icon: <TbShoppingBag />,
    title: "CÁC TIỆN ÍCH",
    status: false,
    child: [
      {
        id: 4,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 1",
      },
      {
        id: 5,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 2",
      },
      {
        id: 6,
        icon: <BsEnvelopePaper />,
        name: "Tiện ích 3",
      },
    ],
  },
];

export default dataPackage;
