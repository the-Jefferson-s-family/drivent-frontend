import api from './api';

async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getRoomsByHotelId(token, hotelId) {
  const response = await api.get(`/hotels/${hotelId}`, {
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

export async function getBookinsByRoomId(token, roomId) {
  const response = await api.get(`/booking/${roomId}`, {
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
  return response.data;
}

const hotelApi={
  getHotels,
  getRoomsByHotelId,
  getBookinsByRoomId,
  getBookings,
  postBooking,
};

export default hotelApi;
