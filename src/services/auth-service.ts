import axios, { AxiosResponse } from "axios";
import {
  TRegisterRequest,
  TSignInRequest,
  TSignInResponse,
} from "../interfaces/user-interfaces";
import { saveStorageToken } from "../utils/storage-utils";
import { ApiClient } from "./api-clients";

export const signIn = async (payload: TSignInRequest, cb?: () => void) => {
  console.log("signIn", payload);

  const response: AxiosResponse<TSignInResponse> = await ApiClient.post(
    `/api/v1/auth/authenticate`,
    payload
  );

  if (response.status === 200) {
    saveStorageToken(response.data.token);
    cb?.();
  }

  return response.data;
};

export const register = async (payload: TRegisterRequest, cb?: () => void) => {
  const registerValues = { ...payload, role: "ADMIN" };

  const response: AxiosResponse<TSignInResponse> = await ApiClient.post(
    `/api/v1/auth/register`,
    registerValues
  );

  if (response.status === 200) {
    cb?.();
  }

  return response.data;
};

export const getTokenFromKiotViet = async () => {
  const data = {
    scopes: "PublicApi.Access",
    grant_type: "client_credentials",
    client_id: "6123c83c-9b78-406e-8e7e-a42ebb02c367",
    client_secret: "1CD4E9BBE765EFED04330FCC39C6E3824102D01F",
  };

  try {
    const response = await axios.post("/token", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response.data);
    localStorage.setItem("KIOT_TOKEN", response.data.access_token);
  } catch (error) {
    console.error("Error:", error);
  }
};
