import privateApiClient from "./PrivateClient";

export const APILogin = (url, payload) => {
  return privateApiClient.post(url, payload);
};

export const APIEmailLogin = (url) => {
  return privateApiClient.get(url);
};

export const APIRegister = (url, payload) => {
  return privateApiClient.post(url, payload);
};

export const APIEmailRegister = (url) => {
  return privateApiClient.get(url);
};

export const APIAddUserInfo = (url, payload) => {
  return privateApiClient.post(url, payload);
};

export const APIUpdateserInfo = (url, payload) => {
  return privateApiClient.put(url, payload);
};

export const APIGetAddedUser = (url) => {
  return privateApiClient.get(url);
};

export const APIUserProfile = (url) => {
  return privateApiClient.get(url);
};
