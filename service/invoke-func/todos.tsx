import axios, { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axiosInstance";

const fetchingFunc = async <T,>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | string | undefined> => {
  try {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    }
  }
};

const TodosAbstract = () => {
  return {
    fetchData: async <T,>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T | null | string | undefined> => {
      if (url.length === 0 || url === "") return null;
      return await fetchingFunc(url, config);
    },

    fetchDataByUserId: async <T,>(
      url: string,
      userId: number,
      config?: AxiosRequestConfig
    ): Promise<T | null | string | undefined> => {
      if (url.length === 0) return null;
      return await fetchingFunc(`${url}?userId=${userId}`, config);
    },

    fetchDataById: async <T,>(
      url: string,
      id: number,
      config?: AxiosRequestConfig
    ): Promise<T | null | string | undefined> => {
      if (url === "") return null;
      return await fetchingFunc(`${url}?id=${id}`, config);
    },

    fetchDataByCompleted: async <T,>(
      url: string,
      completed: boolean,
      config?: AxiosRequestConfig
    ): Promise<T | null | string | undefined> => {
      if (url === "") return null;
      return await fetchingFunc(`${url}?completed=${completed}`, config);
    },
  };
};

export const AbstractTodos = TodosAbstract();
