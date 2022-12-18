import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useGetTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: gettingTicketLoading,
    error: errorGettingTciket,
    act: getTicket
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    ticket,
    gettingTicketLoading,
    errorGettingTciket,
    getTicket
  };
}
