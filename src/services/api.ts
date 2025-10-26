// services/api.js
import axios from "axios";

import { useMockData } from "./mockData";

const USE_MOCK = true; // toggle this to false when real API is ready

export const getUsers = async () => {
  if (USE_MOCK) {
    return useMockData("users");
  }

  const response = await axios.get("/api/users"); // replace with real endpoint
  return response.data;
};

export const getPosts = async () => {
  if (USE_MOCK) {
    return useMockData("posts");
  }

  const response = await axios.get("/api/posts"); // replace with real endpoint
  return response.data;
};
