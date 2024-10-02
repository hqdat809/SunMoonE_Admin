import { AxiosResponse } from "axios";
import { IBankResponse } from "../interfaces/common";
import { ApiClient } from "./api-clients";

export const getBankInfo = async (cb?: () => void) => {
  const response: AxiosResponse<IBankResponse[]> = await ApiClient.get(
    `/api/v1/bank`
  );

  if (response.status === 200) {
    cb?.();
  }

  return response;
};

export const editBankInfo = async (
  bankId: string,
  payload: IBankResponse,
  cb?: () => void
) => {
  const response: AxiosResponse<IBankResponse[]> = await ApiClient.post(
    `/api/v1/bank/${bankId}`,
    payload
  );

  if (response.status === 200) {
    cb?.();
  }

  return response;
};
