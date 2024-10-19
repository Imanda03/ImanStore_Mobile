import axios from 'axios';

export const getProducts = async (authToken: string) => {
  console.log('authToken=>', authToken);
  const response = await axios.get('http://192.168.68.173:5000/api/product/', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
