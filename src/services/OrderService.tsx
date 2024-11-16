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
      'http://192.168.1.104:5000/api/order/',
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

export const getOrder = async (authToken: string, userId: number) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/order/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};

export const deleteUserOrder = async (authToken: string, orderId: number) => {
  const response = await axios.delete(
    `http://192.168.1.104:5000/api/order/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};

export const fetchUserCompletedOrder = async (
  authToken: string,
  userId: number,
) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/order/successPayment/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};

export const fetchCancelledOrder = async (
  authToken: string,
  userId: number,
) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/order/cancelled/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
