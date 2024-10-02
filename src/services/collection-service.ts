import axios, { AxiosResponse } from "axios";
import { IKiotResponse } from "../interfaces/common";
import { EAuthToken } from "../interfaces/user-interfaces";
import {
  ICollections,
  IGetCollectionRequest,
} from "../interfaces/collection-interface";

export const getCollections = async (payload?: IGetCollectionRequest) => {
  try {
    const params = new URLSearchParams(payload as Record<string, string>);
    const response: AxiosResponse<IKiotResponse<ICollections>> =
      await axios.get(`/kiot/categories?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            EAuthToken.KIOT_TOKEN
          )}`,
          Retailer: "thanhthuy1988",
        },
      });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};