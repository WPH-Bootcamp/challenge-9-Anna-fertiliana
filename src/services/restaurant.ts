import { api } from "./api";

export const getRestaurantDetail = async (id: string) => {
  const res = await api.get(`/resto/${id}`);
  return res.data;
};

