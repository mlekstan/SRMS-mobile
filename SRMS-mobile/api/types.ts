export type AccessToken = {
  accessToken: string;
}

export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  dateJoined: string;
  branch: {
    id: number;
    name: string;
  };
}

export type Item = {
  id: number;
  name: string;
  shortName: string;
  barcode: string;
  marketValue: string;
  forSale: boolean;
  sellPrice: string;
  subcategory: {
    id: number;
    name: string;
  };
  branch: {
    id: number;
    name: string;
  };
}