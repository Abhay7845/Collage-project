import axios from "axios";
import { HOST_URL } from "../../API/Host";
import Cookies from "js-cookie"

export const ProfileAPI = async () => {
  const userAccessToken = Cookies.get("token");
  const response = await axios
    .get(`${HOST_URL}/fetchUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: userAccessToken,
      },
    })
    .catch((error) => { });
  return response;
};
