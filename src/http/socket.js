import { useSelector } from "react-redux";

import { io } from "socket.io-client";

function SockectIO() {
  const URL = "http://localhost:3001";
  const user = useSelector((state) => state?.auth.login?.currentUser);

  const token = user?.data.userInfo._id;
  
  const socket = new io(URL, {
    autoConnect: false,
    query: {token},
    // withCredentials: true
  });

  return socket;
}

export default SockectIO;
