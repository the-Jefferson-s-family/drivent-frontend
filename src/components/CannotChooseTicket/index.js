import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function ErrorPage({ message1, message2 }) {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledDiv>
        <p>{message1}</p> 
        <p>{message2}</p>
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
