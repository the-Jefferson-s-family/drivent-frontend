import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useGetTicket from '../../../hooks/api/useTicket';
import PaymentCompletePage from '../../../components/paymentComplete';
import ErrorPage from '../../../components/CannotChooseTicket';
import CreditCardPage from '../../../components/ticketReserved';
import ChooseTicketComponent from '../../../components/chooseTicket';
import { useState } from 'react';

export default function Payment() {
  const { ticket } = useGetTicket(); //Verificação se usuario ja possui ticket
  const { enrollment } = useEnrollment(); 
  const [ticketComplete, setTicketComplete] = useState({});
  const [paymentCompleteBoolean, setPaymentCompleteBoolean] = useState(false);
  const [creditCardBoolean, setCreditCardBoolean] = useState(false);
  const [buyTicketBoolean, setBuyTicketBoolean] = useState(false);

  const ticketData = JSON.parse(window.sessionStorage.getItem('ticketData'));

  useEffect(() => {
    if(enrollment && !ticket) setBuyTicketBoolean(true);
    if(ticket) {
      setTicketComplete(ticket);
      setPaymentCompleteBoolean(true);
      if(ticket.status === 'RESERVED') {
        setPaymentCompleteBoolean(false);
        setCreditCardBoolean(true);
      }
    }
  }, [ticket, enrollment, ticketData]);
  
  function CreditCard() {
    return (
      <CreditCardPage
        ticketName={ticketComplete.TicketType.name} 
        ticketPrice={ticketComplete.TicketType.price} 
        ticketId={ticketComplete.id} 
        setPaymentCompleteBoolean={setPaymentCompleteBoolean}
      /> ); }

  function PaymentSection() {
    return (
      <PaymentCompletePage 
        ticketName={ticketData.category}
        ticketPrice={ticketData.price}
      /> ); }
    
  function TicketSection() {
    return <ChooseTicketComponent ticketReserved={ticket}/>;
  }

  return (
    <>
      <TicketSection/>
      {(ticket) ? <PaymentSection/> : <></>}

      {/* {(creditCardBoolean) ? <CreditCard/> : (<></>) } */}
    </>
  );
}
