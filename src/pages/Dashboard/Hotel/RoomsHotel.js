import { HotelBody, DivRooms, BoxRooms, iconPerson, iconPersonBlack, iconPersonPink, iconPersonGray, BoxRoomsFull, BoxRoomsSelected, ButtonReserve, H1Grey } from './styled';
import hotelApi from '../../../services/hotelsApi';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { useState } from 'react';
import { StyledTypography } from '../../../components/PersonalInformationForm';

export default function RoomsHotel( { id, transationType, bookingId } ) {
  const token = useToken();
  const [bookings, setBookings] = useState ([]);
  const [roomId, setRoomId] = useState('');

  let buttonRoom= 'RESERVAR QUARTO';
  if(transationType) {
    buttonRoom = 'CONFIRMAR TROCA';
  }
  
  useEffect ( async() => {
    await hotelApi.getBookings(token, id).then((e) => {
      setBookings(e);
    }).catch((e) => {
      console.log('catcchhhhhh');//tratar o erro
    });
  }, [id]);

  async function reserve() {
    await hotelApi.postBooking(token, roomId).then((e) => {
      window.location.reload();
    }).catch((e) => {
      console.log('deu ruim', e);
    });
  }
  
  async function chooseRoom() {
    await hotelApi.putRoom(token, bookingId, roomId).then((e) => {
      window.location.reload();
    }).catch((e) => {
      console.log('deu ruim', e);
    });
  }
  
  const render = bookings.map((room, i) => {
    let icons = [];
    if(room.full) {
      for(let i=0; i < room.occupied; i++) {
        icons.push(iconPersonGray);
      }
      return <BoxRoomsFull> 
        {room.name} 
        <div>{icons.map((icon) => {return icon;})}</div>
      </BoxRoomsFull>; 
    }else{
      async function selectedFunc() {
        setRoomId(room.id);
      };
      if(room.id === roomId) {
        for(let i=0; i < room.free -1; i++) {
          icons.push(iconPerson);
        };
        icons.push(iconPersonPink);
        for(let i=0; i < room.occupied; i++) {
          icons.push(iconPersonBlack);
        };
        return <BoxRoomsSelected onClick={() => { selectedFunc(); }}> 
          {room.name} 
          <div>{icons.map((icon) => {return icon;})}</div>
        </BoxRoomsSelected>;
      }else {
        for(let i=0; i < room.free; i++) {
          icons.push(iconPerson);
        };
        for(let i=0; i < room.occupied; i++) {
          icons.push(iconPersonBlack);
        };
        return <BoxRooms onClick={() => { selectedFunc(); }}> 
          {room.name} 
          <div>{icons.map((icon) => {
            return icon;
          })}
          </div>
        </BoxRooms>;
      }
    }
  });
 
  return (<>
    {(bookings.length != 0 )? 
      <HotelBody> 
        <H1Grey style={ { margin: '20px 10px' } }>Ótima pedida! agora escolha seu quarto:</H1Grey>
        <DivRooms>
          {render}
        </DivRooms>
        <ButtonReserve onClick={() => {(transationType)? chooseRoom() : reserve();}}> 
          <StyledTypography variant="h4" style= { { fontSize: '12px', textAlign: 'center', marginTop: '12px' } }>{buttonRoom}</StyledTypography>
        </ButtonReserve>
      </HotelBody>
      : <H1Grey style={ { margin: '20px 10px' } }>Este hotel ainda não tem quartos!!!</H1Grey>}
  </>);
}
