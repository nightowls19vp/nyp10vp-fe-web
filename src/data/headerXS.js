import {
  MdHome,
  MdOutlineHome,
  MdInventory2,
  MdOutlineInventory2,
  MdPersonAddAlt1,
  MdPersonAddAlt,
  MdChat,
  MdOutlineChat,
  MdShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import routesConfig from "../config/routes";
import { Colors } from "../config/Colors";

export const dataHeader1 = [
  {
    id: 1,
    title: "home",
    route: routesConfig.home,
    iconFill: <MdHome size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineHome size={25} color={Colors.icon} />,
  },
  {
    id: 2,
    title: "Package",
    route: "#",
    iconFill: <MdPersonAddAlt1 size={25} color={Colors.primary} />,
    iconOutline: <MdPersonAddAlt size={25} color={Colors.icon} />,
  },
  {
    id: 3,
    title: "Stock",
    route: routesConfig.stock,
    iconFill: <MdInventory2 size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineInventory2 size={25} color={Colors.icon} />,
  },
  {
    id: 4,
    title: "Chat",
    route: "#",
    iconFill: <MdChat size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineChat size={25} color={Colors.icon} />,
  },
  {
    id: 5,
    title: "Shopping",
    route: "#",
    iconFill: <MdShoppingCart size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineShoppingCart size={25} color={Colors.icon} />,
  },
];
