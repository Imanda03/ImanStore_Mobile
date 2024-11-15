import axios from 'axios';

export const getProducts = async (authToken: string) => {
  const response = await axios.get('http://192.168.1.104:5000/api/product/', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const getRecommendedProducts = async (authToken: string, id: number) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/product/recommendation/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
