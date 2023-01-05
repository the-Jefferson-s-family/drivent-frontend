import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import useGetTicketTypes from '../../hooks/api/useTicketTypes';
import OnlineType from './onlineType';
import PresentialType from './presentialType';

export default function ChooseTicketPage() {
  const { ticketTypes } = useGetTicketTypes();
  const [selectedTicket, setSelectedTicket] = useState();
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketTypesData, setTicketTypesData] = useState();

  function toggleTicket(  type, ticket  ) {
    setSelectedTicketType(type);
    setSelectedTicket(ticket);
  }

  useEffect(() => {
    if(ticketTypes) {
      setTicketTypesData(ticketTypes);
    }
  }, [ticketTypes]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Primeiro, escolha sua modalidade de ingresso:</StyledSubTitle>

      {ticketTypesData === undefined ? (<StyledTypography variant="h2">Carregando...</StyledTypography>) : (
        <Container>

          {ticketTypesData.map((type, index) =>
            type.isRemote ? (

              <TicketBox isSelected={selectedTicketType === 'online' ? true : false}  onClick={e => toggleTicket('online', type)} key={index}>
                <BoxSelectionTitle>{type.name}</BoxSelectionTitle>
                <BoxSelectionPrice>R$ {type.price}</BoxSelectionPrice>
              </TicketBox>

            ) : !type.isRemote && type.includesHotel  ? (
              <TicketBox isSelected={selectedTicketType === 'pressencial' ? true : false} onClick={e => toggleTicket('pressencial', type)} >
                <BoxSelectionTitle>{type.name}</BoxSelectionTitle>
                <BoxSelectionPrice>R$ {type.price}</BoxSelectionPrice>
              </TicketBox>
            ) : (
              <></>
            )
          )}
          
        </Container>
        
      )}
      {selectedTicketType === 'online' ? <OnlineType ticket={selectedTicket}/> : selectedTicketType === 'pressencial' ? <PresentialType ticket={selectedTicket}/> : ''}
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
