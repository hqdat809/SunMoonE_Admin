import { AxiosResponse } from "axios";
import { IShopResponse } from "../interfaces/common";
import { ApiClient } from "./api-clients";

export const getShopInfo = async (cb?: () => void) => {
  const response: AxiosResponse<IShopResponse[]> = await ApiClient.get(
    `/api/v1/shop`
  );

  if (response.status === 200) {
    cb?.();
  }

  return response;
};

export const editShopInfo = async (
  shopId: string,
  payload: IShopResponse,
  cb?: () => void
) => {
  const response: AxiosResponse<IShopResponse[]> = await ApiClient.post(
    `/api/v1/shop/${shopId}`,
    payload
  );

  if (response.status === 200) {
    cb?.();
  }

  return response;
};
