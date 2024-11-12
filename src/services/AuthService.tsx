import {useMutation} from 'react-query';
import axios from 'axios';

interface RegisterInterface {
  username: string;
  address: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  role: string;
}

interface ProfileInterface {
  authToken: string;
  userId: number;
  name: string;
  email: string;
  contact: string | number;
  address: string;
}

interface loginInterface {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation(async (registerData: RegisterInterface) => {
    const response = await axios.post(
      'http://192.168.1.104:5000/api/auth/register',
      registerData,
    );
    return response.data;
  });
};

export const useLogin = () => {
  return useMutation(async (loginData: loginInterface) => {
    const response = await axios.post(
      'http://192.168.1.104:5000/api/auth/login',
      loginData,
    );
    return response.data;
  });
};

export const getProfileDetails = async (authToken: string, userId: number) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/auth/getProfile/${userId}`,
  );
  return response.data;
};

export const updateProfile = async ({
  authToken,
  userId,
  name,
  email,
  contact,
  address,
}: ProfileInterface) => {
  const response = await axios.put(
    `http://192.168.1.104:5000/api/auth/profile/${userId}`,
    {username: name, email: email, contactNumber: contact, address: address},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
