// import { Session } from "next-auth";

// export interface SessionType extends Session {
//   user: {
//     id: string;
//     accessToken: string;
//     name: string;
//     email: string;
//     image: string;
//     role: string;
//   };
//   expires: string;
// }

export interface UserType {
  id: string;
  name: string;
  email: string;
  image: string;
  authProvider: string;
  authProviderId: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDimension {
  id: string;
  length: string;
  thickness: string;
  diameter: string;
}

export interface ITechnicalData {
  case: string;
  strap: string;
  warranty: string;
  dialColor: string;
  waterResistance: string;
  logWidth: string;
  creystal: string | null;
  movement: string;
  dimensions: IDimension;
}

export interface IStocks {
  quantity: number;
}

export interface IFeature {
  id: string;
  featName: string;
  productsId: string;
}

export interface ICollection {
  id: string;
  name: string;
  image: string;
  description: string;
}
export interface IProductDetailsCard {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isNew: boolean;
  collectionId: string;
  technicalDataId: string;
  stocksId: string;
  isInStock: boolean;

  technicalData: ITechnicalData;
  Stocks: IStocks;
  features: IFeature[];
  images: { id: string; url: string }[];
  Collection: ICollection;
}

export interface IProductImage {
  id: string;
  url: string;
}

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: IProductImage[];
}

export interface ICartItem {
  cartId: string;
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export type ICart = ICartItem[];
export interface IOrderedProduct {
  id: string;
  productId: string;
  price: number;
  quantity: number;
  product: IProduct;
  cartItemId: string;
  cartId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}
export interface IOrder {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  status: string;
  paymentType: string;
  paymentId: string;
  addressId: string;
  OrderedProducts: ICartItem[];
}
