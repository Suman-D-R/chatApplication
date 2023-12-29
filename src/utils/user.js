import axios from "axios";

export const login = async (data) => {
  const loginData = await axios.post(
    "http://localhost:3020/api/v1/users/login",
    data
  );
  return loginData;
};

export const register = async (data) => {
  const redisterData = await axios.post(
    "http://localhost:3020/api/v1/users",
    data
  );
  return redisterData;
};


