import axios from 'axios';

export const getDiscover = async (authToken: string) => {
  const response = await axios.get('http://192.168.1.104:5000/api/discover/', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const getDiscoverList = async (
  authToken: string,
  id: string | number,
) => {
  const response = await axios.get(
    `http://192.168.1.104:5000/api/discover/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
