import { io } from "socket.io-client";
import { myIP } from "../apis/api";

const socket = io(`http://${myIP}:8080`);

export default socket;
