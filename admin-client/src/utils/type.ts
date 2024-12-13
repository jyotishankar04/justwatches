export interface ICollection {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface IProduct {
  name: string;
  Collection: {
    name: string;
  };

  createdAt: string;
  updatedAt: string;
  id: string;
  price: number;
  stock: number;
}

export interface ICreateProduct {
  name: string;
  collectionId: string;
  price: string;
  description: string;
  features: string[];
  case: string;
  strap: string;
  warranty: string;
  dialColor: string;
  waterResistance: string;
  movement: string;
  crystal: string;
  diameter: string;
  length: string;
  thickness: string;
}

export interface IUpdateProduct {
  name: string;
  collectionId: string;
  price: string;
  description: string;
  case: string;
  strap: string;
  warranty: string;
  dialColor: string;
  waterResistance: string;
  movement: string;
  crystal: string;
  diameter: string;
  length: string;
  thickness: string;
}
export interface IAddresses {
  id: string;
  name: string;
  address: string;
  city: string;
  landmark: string;
  state: string;
  zip: string;
  country: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  authProvider: string;
  isAdmin: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  createdAt: string;
  updatedAt: string;
  id: string;
  status: string;
  totalPrice: number;

  OrderedProducts: IProduct[];
  address: IAddresses;
  user: IUser;
}

export enum orderStatusEnums {
  PENDING = "PENDING",
  ORDER_PLACED = "ORDER_PLACED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum orderSortingTypes {
  NEWEST = "newest",
  OLDEST = "oldest",
  LOWEST_PRICE = "lowest_price",
  HIGHEST_PRICE = "highest_price",
  HIGHEST_QUANTITY = "highest_quantity",
  LOWEST_QUANTITY = "lowest_quantity",
}
