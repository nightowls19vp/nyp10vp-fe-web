import { TbPackages, TbPackage, TbShoppingBag, TbAppWindow } from "react-icons/tb";

const dataPackage = [
  {
    icon: <TbPackages size={25} />,
    title: "CÁC GÓI NGƯỜI DÙNG",
    status: true,
    child: [
      {
        id: 1,
        icon: <TbPackage size={20} />,
        name: "Gói 1",
      },
      {
        id: 2,
        icon: <TbPackage size={20} />,
        name: "Gói 2",
      },
      {
        id: 3,
        icon: <TbPackage size={20} />,
        name: "Gói 3",
      },
    ],
  },
  {
    icon: <TbShoppingBag size={25} />,
    title: "CÁC TIỆN ÍCH",
    status: false,
    child: [
      {
        id: 4,
        icon: <TbAppWindow size={20} />,
        name: "Tiện ích 1",
      },
      {
        id: 5,
        icon: <TbAppWindow size={20} />,
        name: "Tiện ích 2",
      },
      {
        id: 6,
        icon: <TbAppWindow size={20} />,
        name: "Tiện ích 3",
      },
    ],
  },
];

export default dataPackage;
