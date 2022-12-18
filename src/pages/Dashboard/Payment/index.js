import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useGetTicket from '../../../hooks/api/useTicket';
import PaymentCompletePage from '../../../components/paymentComplete';
import NeedEnrollmentPage from '../../../components/CannotChooseTicket';
import CreditCardPage from '../../../components/ticketReserved';
import { useState } from 'react';

export default function Payment() {
  const { ticket } = useGetTicket();
  const { enrollment } = useEnrollment();
  const [ticketComplete, setTicketComplete] = useState({});
  const [paymentCompleteBoolean, setPaymentCompleteBoolean] = useState(false);
  const [creditCardBoolean, setCreditCardBoolean] = useState(false);
  const [buyTicketBoolean, setBuyTicketBoolean] = useState(false);

  useEffect(() => {
    if(ticket) {
      setTicketComplete(ticket);
      setPaymentCompleteBoolean(true);
      if(ticket.status === 'RESERVED') {
        setPaymentCompleteBoolean(false);
        setCreditCardBoolean(true);
      }
    }
    if(enrollment && !ticket) {
      setBuyTicketBoolean(true);
    }
  }, [ticket, enrollment]);
  
  if(paymentCompleteBoolean === true) {
    return (
      <PaymentCompletePage ticketName={ticketComplete.TicketType.name} ticketPrice={ticketComplete.TicketType.price}/>
    );
  }
  if(creditCardBoolean === true) {
    return (
      <CreditCardPage ticketName={ticketComplete.TicketType.name} ticketPrice={ticketComplete.TicketType.price} ticketId={ticketComplete.id} setPaymentCompleteBoolean={setPaymentCompleteBoolean}/>
    );
  }
  if(buyTicketBoolean === true) {
    //Page to Buy Ticket here
    return 'Comprar Ticket: Em breve!';
  }
  return (
    <NeedEnrollmentPage />
  );
}
