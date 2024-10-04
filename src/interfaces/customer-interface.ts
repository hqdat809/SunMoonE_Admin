export interface ICustomer {
  id: number;
  code: string;
  name: string;
  gender?: boolean;
  contactNumber: string;
  address: string;
  retailerId: number;
  branchId: number;
  locationName: string;
  wardName: string;
  email: string;
  modifiedDate: Date;
  createdDate: Date;
  type: number;
  organization: string;
  taxCode: string;
  comments: string;
  debt: number;
}

export interface ICustomerRequest {
  code?: string;
  name?: string;
  contactNumber?: string;
  lastModifiedFrom?: Date;
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: string;
  includeRemoveIds?: boolean;
  includeTotal?: boolean;
  includeCustomerGroup?: boolean;
  birthDate?: string;
  groupId?: number;
  includeCustomerSocial?: boolean;
}
