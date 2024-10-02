import { AxiosResponse } from "axios";
import { ApiClient } from "./api-clients";
import { IShopResponse } from "../interfaces/common";

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
