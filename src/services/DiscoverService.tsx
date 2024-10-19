import axios from 'axios';

export const getDiscover = async (authToken: string) => {
  console.log('authToken=>', authToken);
  const response = await axios.get('http://192.168.68.173:5000/api/discover/', {
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
    `http://192.168.68.173:5000/api/discover/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return response.data;
};
