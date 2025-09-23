import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../confing/axios.confing";
import { AxiosRequestConfig } from "axios";

interface IuseAuthenticated {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useAuthenticated = ({ queryKey, url, config }: IuseAuthenticated) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await AxiosInstance.get(url, config);
      return data;
    },
  });
};
export default useAuthenticated 