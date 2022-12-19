import useToken from '../hooks/useToken';
import api from './api';

export async function getHotel() {
  const token = useToken();
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const hotelApi={
  getHotel,
};

export default hotelApi;
