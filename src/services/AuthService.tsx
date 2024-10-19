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

interface loginInterface {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation(async (registerData: RegisterInterface) => {
    const response = await axios.post(
      'http://192.168.68.173:5000/api/auth/register',
      registerData,
    );
    return response.data;
  });
};

export const useLogin = () => {
  return useMutation(async (loginData: loginInterface) => {
    const response = await axios.post(
      'http://192.168.68.173:5000/api/auth/login',
      loginData,
    );
    return response.data;
  });
};
