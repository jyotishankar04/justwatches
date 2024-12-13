import axiosApi from "./axiosConfig";
import { ICreateProduct, IUpdateProduct } from "./type";

const fetchProducts = async ({
  orderBy = "newest",
  page = 1,
  limit = 200,
  collection = "",
}: {
  orderBy?: string;
  page?: number;
  limit?: number;
  collection?: string;
}) => {
  try {
    const res = await axiosApi.get(
      "/products?orderBy=" +
        orderBy +
        "&limit=" +
        limit +
        "&collection=" +
        collection +
        "&page=" +
        page
    );
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch products",
    };
  }
};

const fetchSession = async () => {
  try {
    const res = await axiosApi.get("/auth");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch session",
    };
  }
};

const deleteProductApi = async (id: string) => {
  try {
    const res = await axiosApi.delete(`/products/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
};
const fetchCollections = async () => {
  try {
    const res = await axiosApi.get("/collections");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch collections",
    };
  }
};
const createProduct = async (data: FormData) => {
  try {
    const res = await axiosApi.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to create product",
    };
  }
};

const getProductById = async (id: string) => {
  try {
    const res = await axiosApi.get(`/products/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch product",
    };
  }
};

const updateProductApi = async (id: string, data: IUpdateProduct) => {
  try {
    const res = await axiosApi.patch(`/products/${id}`, data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update product",
    };
  }
};

const deleteCollectionApi = async (id: string) => {
  try {
    const res = await axiosApi.delete(`/collections/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete collection",
    };
  }
};

const updateCollectionApi = async (id: string, data: any) => {
  try {
    const res = await axiosApi.patch(`/collections/${id}`, data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update collection",
    };
  }
};
const createCollection = async (data: FormData) => {
  try {
    const res = await axiosApi.post("/collections", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to create collection",
    };
  }
};

const getUserApi = async () => {
  try {
    const res = await axiosApi.get("/users");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch user",
    };
  }
};

const getStockApi = async (orderBy: string = "name") => {
  try {
    const res = await axiosApi.get(`/stocks?orderBy=${orderBy}`);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data;
  } catch (error) {
    return {
      successs: false,
      message: "Failed to fetch stock",
    };
  }
};
const updateStockApi = async (
  id: string,
  data: {
    quantity: number;
  }
) => {
  try {
    const res = await axiosApi.patch(`/stocks/${id}`, data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update stock",
    };
  }
};
const getAllOrders = async ({
  orderBy = "newest",
  status = "ALL",
  page = 1,
  limit = 200,
}: {
  orderBy: string;
  status: string;
  page: number;
  limit: number;
}) => {
  try {
    const res = await axiosApi.get(
      "/orders" +
        "?orderBy=" +
        orderBy +
        "&status=" +
        status +
        "&page=" +
        page +
        "&limit=" +
        limit
    );
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch orders",
    };
  }
};
const updateOrderStatusApi = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  try {
    const res = await axiosApi.patch(`/orders/${id}`, { status });
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update order status",
    };
  }
};

export {
  fetchProducts,
  fetchSession,
  deleteProductApi,
  fetchCollections,
  createProduct,
  getProductById,
  updateProductApi,
  deleteCollectionApi,
  updateCollectionApi,
  createCollection,
  getUserApi,
  getStockApi,
  updateStockApi,
  getAllOrders,
  updateOrderStatusApi,
};
