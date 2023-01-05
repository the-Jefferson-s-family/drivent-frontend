import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

export default function ChooseTicketPage() {
  const [selectedTicket, setSelectedTicket] = useState('');
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Primeiro, escolha sua modalidade de ingresso:</StyledSubTitle>
      <Container>
        <TicketBox isSelected={selectedTicket === 'pressencial' ? true : false} onClick={e => setSelectedTicket('pressencial')} >
          <BoxSelectionTitle>Presencial</BoxSelectionTitle>
          <BoxSelectionPrice>R$ 13.5</BoxSelectionPrice>
        </TicketBox>
        <TicketBox isSelected={selectedTicket === 'online' ? true : false}  onClick={e => setSelectedTicket('online')} >
          <BoxSelectionTitle>Online</BoxSelectionTitle>
          <BoxSelectionPrice>R$ 13.5</BoxSelectionPrice>
        </TicketBox>
      </Container>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
const StyledSubTitle = styled.div`
  color: #8E8E8E;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 400;
`;
const Container = styled.div`
  display:flex;
`;
const TicketBox = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #CECECE;
    border-radius: 20px;
    width: 145px;
    height: 145px;
    margin-right: 25px;
    font-weight: 400;
    font-size: 16px;
    flex-direction: column;
    cursor: pointer;
    ${({ isSelected }) => isSelected && 'background: #FFEED2; border: 1px solid #bcbcbc;'}
    :hover{
        box-shadow: 2px 0 10px 0 rgb(0 0 0 / 20%);
    }
`;
const BoxSelectionTitle = styled.div`
  color: #454545;
`;
const BoxSelectionPrice = styled.div`
  margin-top: 20px;
  color: #898989;
`;
