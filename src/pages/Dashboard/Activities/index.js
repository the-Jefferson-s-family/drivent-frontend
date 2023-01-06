import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useGetTicket from '../../../hooks/api/useTicket';
import ErrorPage from '../../../components/CannotChooseTicket';
import { useState } from 'react';

export default function Payment() {
  const { ticket } = useGetTicket();
  const { enrollment } = useEnrollment();
  const [ticketComplete, setTicketComplete] = useState({});
  const [ticketOnlineBoolean, setTicketOnlineBoolean] = useState(false);
  const [paymentCompleteBoolean, setPaymentCompleteBoolean] = useState(false);

  useEffect(() => {
    if(ticket) {
      console.log(ticket.TicketType);
      setTicketComplete(ticket);
      setPaymentCompleteBoolean(true);
      if(ticket.TicketType.isRemote === true) {
        setTicketOnlineBoolean(true);
      }
      if(ticket.status === 'RESERVED') {
        setTicketOnlineBoolean(false);
        setPaymentCompleteBoolean(false);
      }
    }
  }, [ticket, enrollment]);

  if(ticketOnlineBoolean === true) {
    return (
      <ErrorPage message1={'Sua modalidade de ingresso não necessita escolher '} message2={'atividade. Você terá acesso a todas as atividades.'}/>
    );
  }  
  if(paymentCompleteBoolean === true) {
    //Page to Select Activities here
    return 'Selecionar Atividade: Em breve!';
  }
  return (
    <ErrorPage message1={'Você precisa ter confirmado pagamento'} message2={'antes de fazer a escolha de atividades'}/>
  );
}
