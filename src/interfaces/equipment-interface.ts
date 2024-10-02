export enum EEquipmentModalType {
  CREATE_EQUIPMENT = "CREATE_EQUIPMENT",
  UPDATE_EQUIPMENT = "UPDATE_EQUIPMENT",
}

export interface IEquipmentDetail {
  id: number;
  name: string;
  imageUrl: string;
  ownerId: number | null;
  type: number;
  description: string;
  transferredUserIds: number[];
}

export type TCreateRequestEquipment = {
  userId?: number;
  description?: string;
  requestEquipmentTypeId?: string;
};

export type TRequestEquipment = {
  id: number;
  userId: number;
  state: string;
  description: string;
  requestEquipmentTypeId: number;
};

export interface IGetEquipmentRequest {
  ownerId?: number;
  name?: string;
  pageNo: number;
  pageSize: number;
}

export interface IGetEquipmentResponse {
  content: IEquipmentDetail[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
