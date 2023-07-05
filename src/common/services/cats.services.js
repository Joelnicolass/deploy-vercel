import { catsApi } from "../apis/cats.api";

export const getCats = async () => {
  const { data } = await catsApi.get("/images/search", {
    params: {
      limit: 10,
    },
  });

  return data;
};
