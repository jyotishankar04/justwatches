import { axiosApi } from "./axiosConfig";

const getUserApi = async () => {
  try {
    const response = await axiosApi.get("user/me", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
const logoutUser = async () => {
  try {
    const response = await axiosApi.get("auth/logout", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const editProfileApi = async (data: { name: string }) => {
  try {
    const response = await axiosApi.post("user/me/edit", data, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getCollectionApi = async () => {
  try {
    const response = await axiosApi.get("collections", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getSingleCollectionApi = async (collection: string) => {
  try {
    const response = await axiosApi.get("products?collection=" + collection, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getProductById = async (productId: string) => {
  try {
    const response = await axiosApi.get("products/" + productId, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getCartItems = async () => {
  try {
    const response = await axiosApi.get("cart", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const addToCart = async (productId: string) => {
  try {
    const response = await axiosApi.post(
      "cart/" + productId,
      {},
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message || "Something went wrong",
    };
  }
};

const updateCartCount = async (cartItem: string, count: number) => {
  try {
    const response = await axiosApi.patch(
      "/cart/" + cartItem,
      { quantity: count },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return {
      success: true,
      message: "Cart updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

const removeFromCart = async (cartItem: string) => {
  try {
    const response = await axiosApi.delete("/cart/" + cartItem, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const createReview = async ({
  comment,
  rating,
  productId,
}: {
  comment: string;
  rating: number;
  productId: string;
}) => {
  try {
    const response = await axiosApi.post(
      "reviews/" + productId,
      {
        comment,
        rating,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getReviews = async ({ productId }: { productId: string }) => {
  try {
    const response = await axiosApi.get("reviews/" + productId, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getAddresses = async () => {
  try {
    const response = await axiosApi.get("address/", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const deleteAddress = async (addressId: string) => {
  try {
    const response = await axiosApi.delete("address/" + addressId, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
const updateAddress = async ({
  name,
  address,
  city,
  state,
  zipCode,
  country,
  landmark,
  contactNumber,
  addressId,
}: {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark: string;
  contactNumber: string;
  addressId: string;
}) => {
  try {
    const response = await axiosApi.patch(
      "address/" + addressId,
      {
        name,
        address,
        city,
        state,
        zipCode,
        country,
        landmark,
        contactNumber,
        addressId,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const addAddress = async ({
  name,
  address,
  city,
  state,
  zipCode,
  country,
  landmark,
  contactNumber,
}: {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark: string;
  contactNumber: string;
}) => {
  try {
    const response = await axiosApi.post(
      "address/",
      {
        name,
        address,
        city,
        state,
        zipCode,
        country,
        landmark,
        contactNumber,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getAllOrders = async () => {
  try {
    const response = await axiosApi.get("orders", {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getOrderById = async (orderId: string) => {
  try {
    const response = await axiosApi.get("orders/" + orderId, {
      withCredentials: true,
    });
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const createAOrder = async (addressId: string) => {
  try {
    console.log(addressId);
    const response = await axiosApi.post(
      "orders/",
      {
        shippingAddressId: addressId,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const checkOrderPaymentStatus = async ({
  transactionId,
  shippingAddressId,
}: {
  transactionId: string;
  shippingAddressId: string;
}) => {
  try {
    const response = await axiosApi.post(
      "orders/paymentStatus/",
      {
        merchantTransactionId: transactionId,
        shippingAddressId: shippingAddressId,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message,
      };
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export {
  getUserApi,
  editProfileApi,
  getCollectionApi,
  getSingleCollectionApi,
  getProductById,
  getCartItems,
  addToCart,
  updateCartCount,
  removeFromCart,
  logoutUser,
  createReview,
  getReviews,
  getAddresses,
  deleteAddress,
  updateAddress,
  addAddress,
  getAllOrders,
  getOrderById,
  createAOrder,
  checkOrderPaymentStatus,
};
