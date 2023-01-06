import { StyledTypography } from '../../../components/PersonalInformationForm';
import hotelApi from '../../../services/hotelsApi';

import UntouriedPayment from './UntourizedPayment';
import UntouriedTicket from './UntourizedTicket';
import ChooseHotel from './ chooseHotel'; //passar hotel={hotel}
import RoomsHotel from './RoomsHotel'; //passar id={id}
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const token = useToken();
  const [hotel, setHotel] = useState ([]);

  const id=1;

  useEffect(() => {
    hotelApi.getHotel(token).then((e) => {
      setHotel(e);
    }).catch((e) => {
      console.log('catcchhhhhh');//tratar o erro
    });
  }, []);

  return (<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <RoomsHotel id={ id } />
  </>);
}
