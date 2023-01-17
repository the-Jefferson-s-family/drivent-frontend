import { useEffect, useState } from 'react';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import useToken from '../../../hooks/useToken';
import hotelApi from '../../../services/hotelsApi';
import RoomsHotel from './RoomsHotel';
import { AvailableRoom, BoxInfo2, H1Black, H1Grey, HotelBody, HotelBodyInner, HotelRoomInfo, TypesRoom, Image, ButtonReserve } from './styled';

function BoxHotelRender( { booking, setRoomId, setId, setBookingId } ) {
  setBookingId(booking.bookingId);
  setId(booking.hotelId);
  setRoomId(booking.roomId);
  let quantity = '';
  
  if(Number(booking.roomBooking != 1)) {
    let number = booking.roomBooking - 1;
    quantity = 'e mais ' + number;
  }
  return(
    <BoxInfo2>
      <Image src={booking.hotelImage} />
      <H1Black>{booking.hotelName}</H1Black>
      <HotelRoomInfo>
        <TypesRoom> 
          <h4>Quarto reservado</h4> 
          <h5>{booking.roomName} ({booking.roomType})</h5>
        </TypesRoom>
        <AvailableRoom>
          <h4>Pessoas no seu quarto</h4>
          <h5>Você {quantity}</h5>
        </AvailableRoom>
      </HotelRoomInfo>
    </BoxInfo2>
  );
}

export default function BookingHotel( { setTransationType, transationType } ) {
  const token = useToken();
  const [bookingHotel, setBookingHotel] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [id, setId] = useState(0);
  const [chooseRoom, setChooseRoom] = useState(false);
  const [bookingId, setBookingId] = useState(0);
  setTransationType(true);

  useEffect(() => {
    hotelApi.getBookingUser(token).then((e) => {
      setBookingHotel(e);
    }).catch((e) => {
      console.log('deu ruim', e);
    });
  }, []);
  
  return (
    <HotelBody>
      <H1Grey>Você já escolheu seu quarto:</H1Grey>
      
      <HotelBodyInner>
        <div>
          {bookingHotel.map((booking, i) => {
            return <BoxHotelRender 
              key={i} 
              booking = {booking} 
              setRoomId = { setRoomId } 
              setId = {setId} 
              setBookingId = {setBookingId} />;
          })}
        </div>

        <ButtonReserve onClick={() => {setChooseRoom(true); }}> 
          <StyledTypography variant="h4" style= { { fontSize: '12px', textAlign: 'center', marginTop: '12px' } }>TROCAR DE QUARTO</StyledTypography>
        </ButtonReserve>
        {(id != 0 && chooseRoom)? 
          <RoomsHotel id={id} transationType = {transationType} bookingId ={bookingId}/> 
          : 
          <div> </div>}
      </HotelBodyInner>

    </HotelBody>
  );
}
