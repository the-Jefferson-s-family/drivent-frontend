import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { reserveTicket } from '../../services/ticketApi';

export default function  PresentialType({ ticket }) {//Sempre vai vvir como padrão com hotel
  const [selected, setSelected] = useState('');

  return (
    <>
      <StyledSubTitle>Ótimo! Agora escolha sua modalidade de hospedagem: </StyledSubTitle>
      <Container>

        <TicketBox isSelected={selected === 'comHotel' ? true : false}  onClick={e => setSelected('comHotel')} >
          <BoxSelectionTitle>Com Hotel</BoxSelectionTitle>
          <BoxSelectionPrice>+ R$ {ticket.price}</BoxSelectionPrice>
        </TicketBox>

        <TicketBox isSelected={selected === 'semHotel' ? true : false}  onClick={e => setSelected('semHotel')} >
          <BoxSelectionTitle>Sem Hotel</BoxSelectionTitle>
          <BoxSelectionPrice>+ R$ 0</BoxSelectionPrice>
        </TicketBox>

      </Container>
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
