import { StyledTypography } from '../../../components/PersonalInformationForm';
import hotelApi from '../../../services/hotelsApi';

import UntouriedPayment from './UntourizedPayment';
import UntouriedTicket from './UntourizedTicket';
import ChooseHotel from './ chooseHotel'; //passar hotels={hotelsWithRooms}
import BookingHotel from './BoookingHotel';

import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [hotels, setHotels] = useState ([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [haveBooking, setHaveBooking] = useState(false);
  let token = useToken();
  const id= 1;

  useEffect(async() => {
    try {
      await hotelApi.getBookingOfUser(token).then((bookingOfUser) => {
        if(bookingOfUser) { setHaveBooking(true);  }
      });

      if(!haveBooking) {
        const hotelsList = await hotelApi.getHotels(token);
        setHotels(hotelsList);
        await organizeHotelsWithRooms(token, hotelsList);
      }
    } catch (err) { 
      console.log('ERROR CATCH useEffect hotels page index :', err);
    };
  }, []);

  async function organizeHotelsWithRooms(token, hotelList) {
    let list = [];
    for (let i = 0; i < hotelList.length; i++) {
      const request = await hotelApi.getRoomsByHotelId(token, hotelList[i].id);
      list.push(request);
    }
    setHotelsWithRooms([...list]);
  };
  
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      { (haveBooking) ? <BookingHotel/> : <ChooseHotel hotels = {hotelsWithRooms} />}
    </>
  );
}
