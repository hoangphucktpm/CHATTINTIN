import { io } from "socket.io-client";
import { myIP } from "../apis/api";

const socket = io(`https://tranloc.id.vn`);

export default socket;
