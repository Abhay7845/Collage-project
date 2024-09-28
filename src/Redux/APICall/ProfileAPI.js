import axios from "axios";
import { HOST_URL } from "../../API/Host";
import Cookies from "js-cookie";
import { APIUrl } from "../../API/EndPoint";

export const ProfileAPI = async () => {
  const userAccessToken = Cookies.get("token");
  const response = await axios
    .get(`${HOST_URL}/${APIUrl.USER_PROFILE}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: userAccessToken,
      },
    })
    .catch((error) => {});
  return response;
};
