import axios, { AxiosResponse } from "axios";
import { IKiotResponse } from "../interfaces/common";
import { ICustomer, ICustomerRequest } from "../interfaces/customer-interface";
import { EAuthToken } from "../interfaces/user-interfaces";

export const getCustomerFromKiot = async (
  payload?: ICustomerRequest,
  cb?: () => void
) => {
  try {
    const params = new URLSearchParams(payload as Record<string, string>);
    const response: AxiosResponse<IKiotResponse<ICustomer>> = await axios.get(
      `/kiot/customers?${params}`,
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
