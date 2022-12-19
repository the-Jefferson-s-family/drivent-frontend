import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { StyledSubTitle } from './subTitle';
import { StyledTicket } from './ticketContainer';
import { IoCheckmarkCircleSharp } from 'react-icons/io5/';

export default function PaymentCompletePage({ ticketName, ticketPrice }) {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Ingresso escolhido</StyledSubTitle>
      <StyledTicket>
        <h6>{ticketName}</h6>
        <p>R$ {ticketPrice/100} </p>
      </StyledTicket>
      <StyledSubTitle>Pagamento</StyledSubTitle>
      <StyledPaymentConfirmed>
        <StyledCheckMark/>
        <div>
          <h6>Pagamento confirmado!</h6>    
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </StyledPaymentConfirmed>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledPaymentConfirmed = styled.div`
  display: flex;
  margin-top: 17px;
  div{
    display: flex;
    flex-direction: column;
    margin-left: 13px;
    h6{
      font-size: 16px;
      font-weight: 700;
      color: #454545;
      margin-top: 3px;
      margin-bottom: 2px;
    }
    p{
      font-size: 16px;
      font-weight: 400;
      color: #454545;
    }
  }
`;

const StyledCheckMark = styled(IoCheckmarkCircleSharp)`
  font-size: 40px;
  color: #36B853;
`;
