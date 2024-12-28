import { AxiosResponse } from "axios";
import { ApiClient } from "./api-clients";
import { IShopResponse } from "../interfaces/common";
import { IUserData, RoleEnum } from "../interfaces/user-interfaces";

export const getAllUser = async (cb?: () => void) => {
    const response: AxiosResponse<IUserData[]> = await ApiClient.get(
        `/api/v1/user`
    );

    if (response.status === 200) {
        cb?.();
    }

    return response;
};

export const updateUserRole = async (
    userId: string,
    payload: RoleEnum,
    cb?: () => void
) => {
    const response: AxiosResponse<IUserData> = await ApiClient.put(
        `/api/v1/user/update-role/${userId}?role=${payload}`
    );

    if (response.status === 200) {
        cb?.();
    }

    return response;
};
