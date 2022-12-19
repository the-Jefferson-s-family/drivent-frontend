import { StyledTypography } from '../../../components/PersonalInformationForm';
import hotelApi from '../../../services/hotelsApi';

import UntouriedPayment from './UntourizedPayment';
import UntouriedTicket from './UntourizedTicket';
import ChooseHotel from './ chooseHotel';
import { useEffect, useState } from 'react';

export default function Hotel() {
  const [hotel, setHotel] = useState ([]);
  //resolver o loop
  // useEffect(() => {
  //   console.log('passando');
  //   hotelApi.getHotel().then((e) => {
  //     console.log('deu bom', e);
  //   }).catch((e) => {
  //     console.log('deu ruim', e);
  //   });
  // }, []);

  hotelApi.getHotel().then((e) => {
    setHotel(e);
  }).catch((e) => {
    console.log('catcchhhhhh');//tratar o erro
  });

  return (<>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel hotel={hotel}/>
  </>);
}
