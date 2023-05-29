import { io } from "socket.io-client";

const URL = 'http://localhost:3001';

const socket = new io(URL, {
    autoConnect: false,
    // withCredentials: true
});

export default socket;