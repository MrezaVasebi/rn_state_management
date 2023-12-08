import axios from "axios";
import { axiosInstance, baseUrl } from "../service";

export const useApiHook = () => {
  return {
    invokeApi: async <T,>(
      endPoint?: string,
      method?: "get" | "post" | "put" | "delete" | "patch",
      token?: string,
      params?: {},
      headerFormat?: "normal" | "content"
    ): Promise<T | string | undefined> => {
      if (endPoint === undefined) return "Endpoint is necessary...";

      if (method === undefined) method = "get"; // method

      let header = {};
      if (headerFormat === "content") header = { ...baseUrl.content }; // form data
      if (headerFormat === undefined || headerFormat === "normal")
        header = { ...baseUrl.headers }; // normal

      let config = {
        method,
        ...header,
        ...(params !== undefined && { params }),
        url: `${baseUrl.baseUrl}${endPoint}`, // url + endpoint
        ...(token !== undefined && { Authorization: `Bearer ${token}` }),
      };

      try {
        let response = await axiosInstance(config);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.message;
        }
      }
    },
  };
};

export const { invokeApi } = useApiHook();
