import { TbPackages, TbPackage, TbShoppingBag } from "react-icons/tb";
import { BsEnvelopePaper } from "react-icons/bs";

const dataPackage = [
    {
        icon: <TbPackages />,
        title: "Các gói người dùng",
        status: true,
        child: [
            {
                icon: <TbPackage />,
                name: "Gói 1",
            },
            {
                icon: <TbPackage />,
                name: "Gói 2",
            },
            {
                icon: <TbPackage />,
                name: "Gói 3",
            }
        ]
    },
    {
        icon: <TbShoppingBag />,
        title: "Các tiện ích",
        status: false,
        child: [
            {
                icon: <BsEnvelopePaper />,
                name: "Tiện ích 1",
            },
            {
                icon: <BsEnvelopePaper />,
                name: "Tiện ích 2",
            },
            {
                icon: <BsEnvelopePaper />,
                name: "Tiện ích 3",
            },
        ]
    },
]

export default dataPackage;