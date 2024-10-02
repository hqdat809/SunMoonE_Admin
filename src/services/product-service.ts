import axios, { AxiosResponse } from "axios";
import { IKiotResponse } from "../interfaces/common";
import {
  IProductRequest,
  IProductResponse,
} from "../interfaces/product-interface";
import { EAuthToken } from "../interfaces/user-interfaces";

export const getProducts = async (
  payload?: IProductRequest,
  cb?: () => void
) => {
  try {
    const params = new URLSearchParams(payload as Record<string, string>);
    const response: AxiosResponse<IKiotResponse<IProductResponse>> =
      await axios.get(`/kiot/products?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            EAuthToken.KIOT_TOKEN
          )}`,
          Retailer: "thanhthuy1988",
        },
      });

    if (response.status === 200) {
      cb?.();
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
