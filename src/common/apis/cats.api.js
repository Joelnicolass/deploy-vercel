import axios from "axios";

export const catsApi = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});
