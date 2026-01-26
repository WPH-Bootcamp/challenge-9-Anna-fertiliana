import axios from "axios";

export const api = axios.create({
  baseURL: "https://restaurant-be-400174736012.asia-southeast2.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
