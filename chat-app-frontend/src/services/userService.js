import axios from "axios";

const getUser = async () => {
  try {
    const response = await axios.get("/api/user");

    return response.data.name;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getUser };
