import axios, { AxiosResponse } from "axios";
import { IKiotResponse } from "../interfaces/common";
import { IOrder, IOrderRequest } from "../interfaces/order-interface";
import { EAuthToken } from "../interfaces/user-interfaces";

export const getListOrder = async (
  payload?: IOrderRequest,
  cb?: () => void
) => {
  try {
    const params = new URLSearchParams(payload as Record<string, string>);
    const response: AxiosResponse<IKiotResponse<IOrder>> = await axios.get(
      `/kiot/orders?${params}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            EAuthToken.KIOT_TOKEN
          )}`,
          Retailer: "thanhthuy1988",
        },
      }
    );

    if (response.status === 200) {
      cb?.();
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
