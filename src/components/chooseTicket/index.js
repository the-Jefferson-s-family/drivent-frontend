import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import useGetTicketTypes from '../../hooks/api/useTicketTypes';
import OnlineType from './onlineType';
import PresentialType from './presentialType';

import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { reserveTicket } from '../../services/ticketApi';

export default function ChooseTicketPage() {
  const { ticketTypes } = useGetTicketTypes();
  const [selectedTicket, setSelectedTicket] = useState();
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketTypesData, setTicketTypesData] = useState();

  const [includeHotel, setIncludeHotel] = useState(false);
  const [total, setTotal] = useState(parseFloat(0));

  const PRICE_HOTEL = 200;

  const token = useToken();

  useEffect(() => {
    if(ticketTypes) {
      setTicketTypesData(ticketTypes);
    }
  }, [ticketTypes]);

  async function selectTicket(selectedTicketType) {
    console.log('elected ticket type :', selectedTicketType);
    try {
      console.log('Select Ticket PRE REQUEST :');
      const insertTicket = await reserveTicket( { ticketTypeId: selectedTicketType.id }, token );
      console.log('Select Ticket pos REQUEST :', insertTicket);
      if (insertTicket) {
        toast('Ingresso reservado com sucesso!');
        setTimeout(() => {
          window.location.reload(); 
        }, 2000);
      }
    } catch (error) {
      toast('Desculpe, ocorreu algum erro durante sua reserva.');
    }
  }

  function TicketTypeBox({ ticketType }) {
    return (
      <TicketBoxHTML
        onClick={() => {
          setSelectedTicketType(ticketType); 
          setTotal(ticketType.price); 
          setIncludeHotel(false);}} key={ticketType.index}
      >
        <BoxSelectionTitle>{ticketType.name}</BoxSelectionTitle>
        <BoxSelectionPrice>R$ {ticketType.price}</BoxSelectionPrice>
      </TicketBoxHTML> );
  }

  function ConcludingTicketChoice({ selectedTicketType }) {
    return (
      <ConcludingTicketChoiceHTML>
        { !selectedTicketType.includesHotel? (
          <>
            <StyledSubTitle>
              Fechado! O total ficou em <strong>R$ {selectedTicketType.price}</strong>. Agora é só confirmar: </StyledSubTitle>
            <Btn onClick={() => selectTicket(selectedTicketType)} >RESERVAR INGRESSO</Btn>
          </>
        ) : (
          <>
            <StyledSubTitle>Ótimo! Agora escolha sua modalidade de hospedagem: </StyledSubTitle>
            
            <Container>
              <TicketBox
                onClick={(e) => {setTotal(selectedTicketType.price + PRICE_HOTEL); setIncludeHotel(true); } } 
              >
                <BoxSelectionTitle>Com Hotel</BoxSelectionTitle>
                <BoxSelectionPrice>+ R$ ${PRICE_HOTEL} </BoxSelectionPrice>
              </TicketBox>

              <TicketBox
                onClick={(e) => {setTotal(selectedTicketType.price);  setIncludeHotel(true);}}
              >
                <BoxSelectionTitle>Sem Hotel</BoxSelectionTitle>
                <BoxSelectionPrice>+ R$ 0</BoxSelectionPrice>
              </TicketBox>
            </Container>
            { includeHotel? 
              ( <>
                <StyledSubTitle>Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar: </StyledSubTitle>
                <Btn onClick={() => selectTicket(selectedTicketType)} >RESERVAR INGRESSO</Btn>
              </>
              ) : (
                <>  </> 
              ) }
          </>)}
      </ConcludingTicketChoiceHTML>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Primeiro, escolha sua modalidade de ingresso:</StyledSubTitle>

      {ticketTypesData === undefined ? (
        <StyledTypography variant="h2">Carregando...</StyledTypography>
      ) : (
        <Container>
          {ticketTypesData.map((ticketType) => <TicketTypeBox ticketType={ticketType}/>)}
        </Container> 
      )}

      <ConcludingTicketChoice selectedTicketType={selectedTicketType}/>
    </>
  );
}

const ConcludingTicketChoiceHTML = styled.div``;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
const StyledSubTitle = styled.div`
  color: #8E8E8E;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 400;
`;
const Container = styled.div`
  display:flex;
`;
const TicketBoxHTML = styled.div`
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
const Btn = styled.button`
    width: 200px;
    background-color: #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #fff;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    color: #000000;
    cursor: pointer;
    box-sizing: border-box;
    :hover{
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
        border: 1px solid #CECECE;
    }
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
