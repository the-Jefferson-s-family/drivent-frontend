import api from './api';

async function getHotel(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function getBookings(token, hotelId) {
  const response = await api.get(`/booking/all/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function postBooking(token, roomId) {
  const response = await api.post('/booking', {
    roomId
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const hotelApi={
  getHotel,
  getBookings,
  postBooking,
};

export default hotelApi;
