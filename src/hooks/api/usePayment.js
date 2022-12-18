import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();

  const {
    loading: payingLoading,
    error: paymentError,
    act: payRoute
  } = useAsync((data) => paymentApi.payTicket(data, token), false);

  return {
    payingLoading,
    paymentError,
    payRoute
  };
}
