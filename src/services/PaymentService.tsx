import axios from 'axios';
import {useMutation} from 'react-query';

interface PaymentPayload {
  customerId: string;
  ephemeralKey: string;
  paymentIntent: string;
  totalPayment: number;
  orderQuantities: any;
  userId: number;
}
export const fetchPaymentSheetParams = (authToken: string) => {
  return useMutation(async (amount: number) => {
    const response = await axios.post(
      'http://192.168.1.104:5000/api/payment/sheet',
      {amount: amount},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data;
  });
};

export const PaymentSaved = (authToken: string) => {
  return useMutation(async (payloadData: PaymentPayload) => {
    const response = await axios.post(
      'http://192.168.1.104:5000/api/payment/',
      {payloadData},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data;
  });
};
