import axios from "axios";
import { baseUrl } from "./baseUrl";

export const axiosInstance = axios.create({
  baseURL: baseUrl.baseUrl,
});
