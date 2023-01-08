import { useEffect, useState } from 'react';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import useToken from '../../../hooks/useToken';
import hotelApi from '../../../services/hotelsApi';
import { AvailableRoom, BoxInfo2, H1Black, H1Grey, HotelBody, HotelBodyInner, HotelRoomInfo, TypesRoom, Image, ButtonReserve   } from './styled';

function BoxHotelRender( { booking } ) {
  console.log(booking);
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

export default function BookingHotel() {
  const token = useToken();
  const [bookingHotel, setBookingHotel] = useState([]);

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
          {bookingHotel.map((booking) => {
            return <BoxHotelRender booking = {booking} />;
          })}
        </div>
        <ButtonReserve onClick={() => {alert('olaa');}}> 
          <StyledTypography variant="h4" style= { { fontSize: '12px', textAlign: 'center', marginTop: '12px' } }>TROCAR DE QUARTO</StyledTypography>
        </ButtonReserve>
      </HotelBodyInner>
    </HotelBody>
  );
}
