import { io } from "socket.io-client";
import axios from "axios";

export const socket = io("/", {
  path: "/chat/",
});

const getHistory = async () => {
  try {
    const response = await axios.get("/api/chat");

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getHistory };
