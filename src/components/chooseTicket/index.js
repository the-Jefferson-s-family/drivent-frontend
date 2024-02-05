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
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketTypesData, setTicketTypesData] = useState();
  const [isHotelIncluded, setIsHotelIncluded] = useState(false);
  const [typeAccomodationSelected, setTypeAccomodationSelected] = useState(false);
  const [total, setTotal] = useState(parseFloat(0));
  const [reserveAvalible, setReserveAvalible] = useState(false);

  const WITH_HOTEL = 'WITH_HOTEL';
  const WITHOUT_HOTEL = 'WITHOUT_HOTEL';
  const PRICE_HOTEL = 200;
  const token = useToken();

  useEffect(() => {
    if(ticketTypes) {
      setTicketTypesData(ticketTypes);
    }
  }, [ticketTypes]);

  async function toReserveTicket(selectedTicketType) {
    try {
      const insertTicket = await reserveTicket( { ticketTypeId: selectedTicketType.id }, token );
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

  function Ticket({ ticket }) {
    return (
      <TicketBoxHTML
        ticketType={ticket}
        selectedTicketType={selectedTicketType}
        onClick={() => {
          setSelectedTicketType(ticket); 
          setTotal(ticket.price);
          setIsHotelIncluded('');
          setTypeAccomodationSelected(false);
          if(!ticket.includesHotel) setReserveAvalible(true);
          else setReserveAvalible(false);
        }} 
        key={ticket.index}
      >
        <TicketTitle> {ticket.name} </TicketTitle>
        <TicketPrice> R$ {ticket.price} </TicketPrice>
      </TicketBoxHTML> );
  }

  function ConcludingTicketChoice({ selectedTicketType }) {
    return (
      <ConcludingTicketChoiceHTML>
        { !selectedTicketType.includesHotel? (
          <>
            <StyledSubTitle>
              Fechado! O total ficou em <strong>R$ {selectedTicketType.price}</strong>. Agora é só confirmar: </StyledSubTitle>
            <Btn onClick={() => toReserveTicket(selectedTicketType)} >RESERVAR INGRESSO</Btn>
          </>
        ) : (
          <>
            <StyledSubTitle>Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar: </StyledSubTitle>
            <Btn onClick={() => toReserveTicket(selectedTicketType) } > RESERVAR INGRESSO </Btn>
          </> ) }
      </ConcludingTicketChoiceHTML>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledSubTitle>Primeiro, escolha sua modalidade de ingresso:</StyledSubTitle>

      {/* SELECT ONLINE OR PRESENCIAL TICKET */}
      {(ticketTypesData != null) ? 
        <Container> {ticketTypesData.map((ticket) => <Ticket ticket={ticket}/>)} </Container> : (<></>) }

      {/* IF TICKET GIVES OPTION OF CHOSE ACOMODATION, IT ALLOW THE USER CHOSE TO INCLUDE OR NOT THE HOTEL*/}
      {(selectedTicketType.includesHotel === true) ? (
        <><StyledSubTitle>Ótimo! Agora escolha sua modalidade de hospedagem: </StyledSubTitle>
          <Container>
            <TicketBox
              typeAccomodation={WITH_HOTEL}
              typeAccomodationSelected={typeAccomodationSelected}
              onClick={(e) => {
                setTotal( total+PRICE_HOTEL );
                setTypeAccomodationSelected(WITH_HOTEL);
                setReserveAvalible(true); }} 
            >
              <TicketTitle>Com Hotel</TicketTitle>
              <TicketPrice>+ R$ ${PRICE_HOTEL} </TicketPrice>
            </TicketBox>

            <TicketBox
              typeAccomodation={WITHOUT_HOTEL}
              typeAccomodationSelected={typeAccomodationSelected}
              onClick={(e) => {
                setTotal(selectedTicketType.price);
                setTypeAccomodationSelected(WITHOUT_HOTEL);
                setReserveAvalible(true); }}
            >
              <TicketTitle>Sem Hotel</TicketTitle>
              <TicketPrice>+ R$ 0</TicketPrice>
            </TicketBox>
          </Container> </> ) : (<></>) }

      {/* IF EVERYTHING ARE SELECTED */}
      {(reserveAvalible) ?
        (<ConcludingTicketChoice selectedTicketType={selectedTicketType}/> ) : (<></>) }
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
    ${({ ticketType, selectedTicketType }) => {
    if(ticketType === selectedTicketType) {
      return 'background: #FFEED2; border: 1px solid #bcbcbc;';
    }}}
    :hover{
        box-shadow: 2px 0 10px 0 rgb(0 0 0 / 20%);
    }
`;
const TicketTitle = styled.div`
  color: #454545;
`;
const TicketPrice = styled.div`
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
    ${({ typeAccomodation, typeAccomodationSelected }) => {
    if(typeAccomodation === typeAccomodationSelected) {
      return 'background: #FFEED2; border: 1px solid #bcbcbc;';
    }}}
    :hover{
        box-shadow: 2px 0 10px 0 rgb(0 0 0 / 20%);
    }
`;
