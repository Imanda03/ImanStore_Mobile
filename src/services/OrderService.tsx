import axios from 'axios';
import {useMutation} from 'react-query';

interface OrderInterface {
  userId: number;
  productId: number;
  status: 'created' | 'inProgress';
}

export const addOrder = (authToken: string) => {
  return useMutation(async (orderData: OrderInterface) => {
    const response = await axios.post(
      'http://192.168.68.173:5000/api/order/',
      orderData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data;
  });
};

export const getOrder = async (authToken: string, userId: string) => {
  const response = await axios.get(
    `http://192.168.68.173:5000/api/order/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
