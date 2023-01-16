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
  const [transationType, setTransationType] = useState(false);
  const [payment, setPayment] = useState(false);
  const [ticket, setTicket] = useState(false);
  let token = useToken();
  const id= 1;

  useEffect(async() => {
    try {
      const hotelsList = await hotelApi.getHotels(token);
      setHotels(hotelsList);
      await organizeHotelsWithRooms(token, hotelsList);
      await hotelApi.getBooking(token).then((e) => {
        setHaveBooking(true);
      });
    } catch (e) {
      if(e.response.status === 402 && !e.response.data.message) {
        setPayment(true);
      }
      if (e.response.data.message) {
        setTicket(true);
      };
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
      {(payment)? <UntouriedPayment></UntouriedPayment> 
        :
        (ticket)? <UntouriedTicket></UntouriedTicket>
          :
          (haveBooking)? 
            <BookingHotel setTransationType = {setTransationType} transationType ={transationType}/>
            : 
            <ChooseHotel hotels = {hotelsWithRooms} setTransationType = {setTransationType} transationType = {transationType}/>}
    </>
  );
}
