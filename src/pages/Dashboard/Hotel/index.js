import { StyledTypography } from '../../../components/PersonalInformationForm';
import hotelApi from '../../../services/hotelsApi';

import UntouriedPayment from './UntourizedPayment';
import UntouriedTicket from './UntourizedTicket';
import ChooseHotel from './ chooseHotel'; //passar hotels={hotels}
import RoomsHotel from './RoomsHotel'; //passar id={id}

import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [hotels, setHotels] = useState ([]);
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  let token = useToken();
  const id= 1;

  useEffect(async() => {
    try {
      const hotelsList = await hotelApi.getHotels(token);
      setHotels(hotelsList);
      await organizeHotelsWithRooms(token, hotelsList);
    } catch (e) {
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
      <ChooseHotel hotels={hotelsWithRooms}/>
    </>
  );
}
