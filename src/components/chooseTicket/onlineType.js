import styled from 'styled-components';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { reserveTicket } from '../../services/ticketApi';

export default function  OnlineType({ ticket }) {
  const token = useToken();

  async function selectTicket() {
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
  return (
    <>
      <StyledSubTitle>Fechado! O total ficou em <strong>R$ {ticket.price}</strong>. Agora é só confirmar: </StyledSubTitle>
      <Btn onClick={() => selectTicket()} >RESERVAR INGRESSO</Btn>
    </>
  );
};

const StyledSubTitle = styled.div`
  color: #8E8E8E;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 400;
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
