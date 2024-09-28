import axios from "axios";
import Cookies from "js-cookie";
import { HOST_URL } from "./Host";
const authToken = Cookies.get("token");

export const privateApiClient = axios.create({
  baseURL: HOST_URL,
  headers: {
    Authorization: authToken,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cach",
    "access-control-allow-origin": "*",
  },
});

export default privateApiClient;
