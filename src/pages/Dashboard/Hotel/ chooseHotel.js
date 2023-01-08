import { roundToNearestMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import hotelApi from '../../../services/hotelsApi';
import RoomsHotel from './RoomsHotel';
import { BoxInfo, H1Black, H1Grey, HotelBody, Image, HotelBodyInner, HotelRoomInfo, TypesRoom, AvailableRoom } from './styled';

function BoxHotel( { hotel, setId  } ) {
  const roomNameString = filterRoomNames(hotel.Rooms);
  const numeroVagas = useCountAvailableRooms(hotel.Rooms);
  
  function selectedHotel(id) {
    setId(id);
  }

  return(
    <BoxInfo onClick={() => {selectedHotel(hotel.id);}}>
      <Image src={hotel.image} />
      <H1Black>{hotel.name}</H1Black>
      <HotelRoomInfo>
        <TypesRoom> 
          <h4>Tipos de acomodação</h4> 
          <h5> {roomNameString} </h5>
        </TypesRoom>
        <AvailableRoom>
          <h4>Tipos de acomodação</h4>
          <h5>{numeroVagas}</h5>
        </AvailableRoom>
      </HotelRoomInfo>
    </BoxInfo>
  );
}

function filterRoomNames(rooms) {
  const roomNames = rooms.map((e, i) => e.name);
  let roomNamesString = '';
  for (let i = 0; i < roomNames.length; i++) {
    if(i === 0 || roomNames.length === 1) {
      roomNamesString = `${roomNames[i]}`;
      continue;
    }  
    if(i === roomNames.length -1 && i !== 0) {
      roomNamesString = roomNamesString+` e ${roomNames[i]}`;
    }
    else{
      roomNamesString = roomNamesString+`, ${roomNames[i]}`;
    }
  }
  return roomNamesString;
}

function useCountAvailableRooms(rooms) {
  const [numeroVagas, setNumeroVagas] = useState(0);
  const token = useToken();

  useEffect( async() => {
    let roomsBooked = 0;
    let totalCapacity = 0;

    const promises = rooms.map( async(e) => {
      const request = await hotelApi.getBookinsByRoomId(token, e.id);
      roomsBooked = roomsBooked + request.length;
      totalCapacity = totalCapacity + e.capacity;
      return request;
    });

    await Promise.all(promises);
    setNumeroVagas( totalCapacity - roomsBooked );
  }, []);

  return numeroVagas;
}

export default function ChooseHotel( { hotels } ) {
  const [id, setId] = useState(0);
  return (<>
    <HotelBody>
      <H1Grey>Primeiro, escolha seu hotel</H1Grey>
      <HotelBodyInner>
        <div>
          {hotels.map((e, i) => (<BoxHotel key={i} hotel={e}  setId={setId} />))}
        </div>
        {(id != 0 )? <RoomsHotel id = {id} /> : <div></div>}
      </HotelBodyInner>
    </HotelBody>
  </>);
}
