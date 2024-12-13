import axios from "axios";
export const axiosApi = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
    withCredentials: "true",
  },
});

export const postalApi = axios.create({
  baseURL: "https://api.postalpincode.in/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authUserBySocial = async ({
  email,
  providerId,
  providerName,
  name,
  image,
}: {
  email: string;
  name: string;
  image: string;
  providerId: string;
  providerName: string;
}) => {
  try {
    const res = await axiosApi.post("/auth", {
      email,
      provider: providerName,
      providerId: providerId,
      name,
      image,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
