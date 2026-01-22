export type AccessToken = {
  accessToken: string;
};

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
};

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
};

export type RentalSalePosition = {
  id: number;
  numberOfItems: number;
  rentalLength: string;
  charge: string;
  surcharge: string;
  subcategory: {
    id: number;
    name: string;
  };
};

export type RentalSale = {
  id: number;
  saleDate: string;
  actionRequired: boolean;
  chargePredicted: string;
  charge: string;
  surcharge: string;
  rentalSalePositions: RentalSalePosition[];
};