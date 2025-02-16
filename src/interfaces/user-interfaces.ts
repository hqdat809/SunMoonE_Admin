export interface IUserDetail {
  id: number;
  email: string;
  accessExpiration: string | number;
  createdAt: string | number;
}

export type TSignInRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TSignInResponse = {
  token: string;
};

export enum EAuthToken {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  DEVICE_TOKEN = "DEVICE_TOKEN",
  KIOT_TOKEN = "KIOT_TOKEN",
}

export type TAuthToken = {
  accessToken: string;
};

export enum EUserModalType {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

export type TCreateUserRequest = {
  email: string;
  password: string;
  expiration: number | string | Date;
};

export type TUpdateUserRequest = {
  id?: number;
  expiration: number | string | Date;
};

export type TChangePasswordRequest = {
  id?: number;
  password: string;
};

export type TTransferEquipment = {
  userId: number;
  equipmentIds: number[];
};

export interface Role {
  id: number;
  name: string;
}

export enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  Customer = "Customer",
  CTV1 = "CTV1",
  CTV2 = "CTV2",
  CTV3 = "CTV3",
}

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  role: RoleEnum;
  enabled: boolean;
  customerId: string;
  username: string;
  phone: string;
  userBank: IUserBank;
  accountNonLocked: boolean;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}

export interface IUserBank {
  id: string;
  bankName: string;
  bankId: string;
  fullName: string;
}

export interface Authority {
  authority: string;
}

export interface INotification {
  id: number;
  userOwnerId: number;
  type: string;
  description: null | string;
  createdAt: Date | null;
  read: boolean;
}
