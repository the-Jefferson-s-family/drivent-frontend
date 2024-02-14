import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import useGetTicketTypes from '../../hooks/api/useTicketTypes';
import OnlineType from './onlineType';
import PresentialType from './presentialType';

import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { reserveTicket } from '../../services/ticketApi';

import { StyledTicket } from '../paymentComplete/ticketContainer';
 
export default function ChooseTicketComponent({ ticketReserved }) {
  const { ticketTypes } = useGetTicketTypes();
  const [ticketsData, setTicketsData] = useState();

  const [modality, setModality] = useState('');
  const [ticketToReserve, setTicketToReserve] = useState('');

  const [selectedIdDiv1, setSelectedIdDiv1] = useState(null);
  const [selectedIdDiv2, setSelectedIdDiv2] = useState(null);

  const token = useToken();

  useEffect(() => {
    if(ticketTypes) {
      setTicketsData(ticketTypes);
    }
  }, [ticketTypes]);

  async function sendReservation(ticket) {
    try {
      const insertTicket = await reserveTicket( { ticketTypeId: ticket.id }, token );
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

  function updateTicketToReserve(ticket) {
    setTicketToReserve(ticket);
  }

  function Ticket({ 
    ticketData, price, selectedId, setSelectedId, 
    updateFlag, updateTicketToReserve }) {
    return (
      <TicketBoxHTML
        key={ticketData.id}
        isSelected={selectedId === ticketData.id}
        onClick={() => {
          //style sinalization
          setSelectedId(ticketData.id);

          if(ticketData.name == 'Online') {
            updateTicketToReserve(ticketData); 
            setModality(ticketData.name);
            setSelectedIdDiv2(null);
          }
          if(ticketData.name === 'Presencial') {
            console.log(ticketData.name);
            setModality(ticketData.name);
            updateTicketToReserve('');
          }
          else {
            updateTicketToReserve(ticketData);
          }
        } }>
        <TicketTitle> {ticketData.name} </TicketTitle>
        <TicketPrice> {price} </TicketPrice>
      </TicketBoxHTML> );
  }

  function ButtonReserveTicket({ ticketToReserve }) {
    return (
      <ConcludingTicketChoiceHTML>   
        <StyledSubTitle>Fechado! O total ficou em <strong>R$ {ticketToReserve.price}</strong>. Agora é só confirmar: </StyledSubTitle>
        
        <Btn onClick={() => {
          sendReservation(ticketToReserve);
        } } > SELECIONAR INGRESSO </Btn>
      </ConcludingTicketChoiceHTML>
    );
  }

  if(ticketReserved) { 
    return (
      <>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <StyledSubTitle>Ingresso escolhido</StyledSubTitle>
        <StyledTicket>
          {(ticketReserved.TicketType.name === 'Online') ? 
            (<h6>{ticketReserved.TicketType.name}</h6>) 
            : 
            (<h6>{`Presencial ${ticketReserved.TicketType.name}`}</h6>)}
          <p>R$ {ticketReserved.TicketType.price} </p>
        </StyledTicket>
      </> );
  } else {
    return (
      <>
        <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
        <StyledSubTitle>Primeiro, escolha sua modalidade de ingresso:</StyledSubTitle>
        <Container> 
          {(ticketsData) ? (<>
            {ticketsData.map((ticket, index) => {
              if(index < 2) { return (
                <Ticket
                  updateTicketToReserve={updateTicketToReserve}
                  selectedId={selectedIdDiv1}
                  setSelectedId={setSelectedIdDiv1}
                  ticketData={ticket} 
                  price={`R$ ${ticket.price}`}/>);
              } else <></>; } ) } 
          </>) : (<></>)}
        </Container>
        
        {(modality == 'Presencial') ? (
          <>
            <StyledSubTitle>Ótimo! Agora escolha sua modalidade de hospedagem: </StyledSubTitle>
            <Container>
              {(ticketsData) ? (<>
                {ticketsData.map((ticket) => {
                  if(ticket.name == 'Sem Hotel') return (
                    <Ticket
                      updateTicketToReserve={updateTicketToReserve}
                      selectedId={selectedIdDiv2}
                      setSelectedId={setSelectedIdDiv2}
                      ticketData={ticket} 
                      price={'+ R$ 0'}/>);
                  if(ticket.name == 'Com Hotel') return ( 
                    <Ticket
                      updateTicketToReserve={updateTicketToReserve}
                      selectedId={selectedIdDiv2}
                      setSelectedId={setSelectedIdDiv2}
                      ticketData={ticket} 
                      price={'+ R$ 350'}/>);
                } ) }
              </> ) : (<></>) }
            </Container> 
          </> ) : (<></>) }

        {(ticketToReserve) ? (<ButtonReserveTicket ticketToReserve={ticketToReserve}/> ) : (<></>) }
      </> );
  }
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
    :hover{
        box-shadow: 2px 0 10px 0 rgb(0 0 0 / 20%);
    };
  /* 
  ${({ ticketType, selectedTicketType }) => {
    if(ticketType === selectedTicketType) {
      return 'background: #FFEED2; border: 1px solid #bcbcbc;';
    }}} */

  background-color: ${props => props.isSelected ? '#FFEED2' : ''};
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
