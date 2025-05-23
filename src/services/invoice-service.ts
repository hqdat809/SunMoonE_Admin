import axios, { AxiosResponse } from "axios";
import { IInvoice, IInvoiceRequest } from "../interfaces/bill-interface";
import { IKiotResponse } from "../interfaces/common";
import { EAuthToken } from "../interfaces/user-interfaces";

export const getListInvoice = async (
  payload?: IInvoiceRequest,
  cb?: () => void
) => {
  try {
    const params = new URLSearchParams(payload as Record<string, string>);
    const response: AxiosResponse<IKiotResponse<IInvoice>> = await axios.get(
      `/kiot/invoices?${params}`,
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
