import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await api.get("/menus");
      return res.data.data; // biasanya backend pakai data.data
    },
  });
};
