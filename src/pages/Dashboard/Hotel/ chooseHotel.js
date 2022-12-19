import { BoxInfo, H1Black, H1Grey, HotelBody, Image, HotelBodyInner } from './styled';

function BoxHotel( { name, image } ) {
  return(
    <BoxInfo>
      <Image src={image} />
      <H1Black>{name}</H1Black>
    </BoxInfo>
  );
}

export default function ChooseHotel( { hotel } ) {
  // console.log(hotel);
  return (<>
    <HotelBody>
      <H1Grey>Primeiro, escolha seu hotel</H1Grey>
      <HotelBodyInner>
        {hotel.map((e, i) => (<BoxHotel key={i} name={e.name} image={e.image} />))}
      </HotelBodyInner>
    </HotelBody>
  </>);
}
