import styled from 'styled-components';
// import PaymentForm from './PaymentForm';
import Typography from '@material-ui/core/Typography';
import usePayment from '../../hooks/api/usePayment';
import { StyledSubTitle } from '../paymentComplete/subTitle';
import { StyledTicket } from '../paymentComplete/ticketContainer';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreditCardPage({ ticketName, ticketPrice, includeHotel, ticketId, setPaymentCompleteBoolean }) {
  const [form, setForm] = useState({});
  const [issuer, setIssuer] = useState('Unknown');
  const { payRoute } = usePayment();
  
  const HOTEL_PRICE = 200;

  async function handleForm(event) {
    event.preventDefault();

    try {
      const formToPay = {
        ticketId: ticketId,
        cardData: {
          issuer: issuer,
          number: form.number,
          name: form.name,
          expirationDate: form.expiry,
          cvv: form.cvc
        }
      };
      await payRoute(formToPay);
      toast('Pagamento Finalizado Com Sucesso!');
      setPaymentCompleteBoolean(true);
    } catch (err) {
      toast('Não foi possível fazer o Pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Ingresso escolhido</StyledSubTitle>
      <StyledTicket>
        {includeHotel? (
          <>
            <h6>{ticketName} + Com Hotel</h6>
            <p>R$ {ticketPrice + HOTEL_PRICE}</p> 
          </>
        ) : (
          <>
            <h6>{ticketName}</h6>
            <p>R$ {ticketPrice}</p> 
          </>
        )}
      </StyledTicket>
      <StyledSubTitle>Pagamento</StyledSubTitle>
      {/* <PaymentForm form={form} setForm={setForm} setIssuer={setIssuer} handleForm={handleForm}/> */}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
