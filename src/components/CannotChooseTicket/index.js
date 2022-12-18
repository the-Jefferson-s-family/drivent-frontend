import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function NeedEnrollmentPage() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledDiv>
        <p>Você precisa completar sua inscrição</p> 
        <p>antes de prosseguir pra escolha de ingresso</p>
      </StyledDiv>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
  p{
    color: #8E8E8E;
    font-size: 20px;
  }
`;
