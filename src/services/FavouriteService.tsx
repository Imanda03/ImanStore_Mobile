import axios from 'axios';
import {useMutation} from 'react-query';

interface CheckFavourite {
  userId: number | string;
  productId: number | string;
  status?: 'add' | 'remove';
}

interface CheckResponse {
  exists: boolean;
}
export const checkFavourite = async (
  authToken: string,
  data: CheckFavourite,
) => {
  const response = await axios.get(
    `http://192.168.68.173:5000/api/favourite/check/${data.userId}/${data.productId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  return response.data;
};

export const toggleFavourite = async (
  authToken: string,
  data: CheckFavourite,
) => {
  const response = await axios.put(
    'http://192.168.68.173:5000/api/favourite',
    {
      userId: data.userId,
      productId: data.productId,
      status: data.status,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  return response.data;
};

export const getFavouriteList = async (authToken: string, userId: number) => {
  const response = await axios.get(
    `http://192.168.68.173:5000/api/favourite/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
