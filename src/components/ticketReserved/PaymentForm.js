import React from 'react';
// import Cards from 'react-credit-cards';
import styled from 'styled-components';
import GetCardType from './getCardIssuer';
// import 'react-credit-cards/es/styles-compiled.css';
 
export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'expiry' && value.length === 2) {
      if(this.state.expiry.includes('/')) {
        this.props.setForm({ ...this.props.form, [name]: value });
        this.setState({ [name]: value });
        return;
      }
      this.setState({ expiry: value+'/' });
      this.props.setForm({ ...this.props.form, expiry: value+ '/' });
      return;
    }
    this.props.setForm({ ...this.props.form, [name]: value });
    this.props.setIssuer(GetCardType(this.state.number));
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <StyledPage> 
          <StyledDiv id="PaymentForm">
            {/* <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            /> */}
          </StyledDiv>
          <StyledDiv>
            <form onSubmit={this.props.handleForm}>
              <StyledInputNameNumber
                type="tel"
                name="number"
                placeholder="Card Number"
                maxLength={19}
                value={this.state.number}
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <p>E.g.: 49..., 51..., 36..., 27...</p>
              <StyledInputNameNumber
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <StyledDivFlex>
                <StyledInputDate
                  type="tel"
                  name="expiry"
                  placeholder="Valid Thru"
                  maxLength={5}
                  value={this.state.expiry}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <StyledInputCVC
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  maxLength={3}
                  value={this.state.cvc}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </StyledDivFlex>
              <StyledConfirmButton>FINALIZAR PAGAMENTO</StyledConfirmButton>
            </form>
          </StyledDiv>
        </StyledPage>  
      </>      
    );
  }
}

const StyledDiv = styled.div`
  width: 290px;
  display: flex;
  margin-top: 20px;
  margin-right: 20px;
    p{
      margin-bottom: 8px;
      font-size: 20px;
      color: grey;
    }
`;

const StyledDivFlex = styled.div`
  display: flex;
`;

const StyledPage = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

const StyledInputNameNumber = styled.input`
  display: flex;
  font-size: 20px;
  width: 290px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: grey;
  margin-bottom: 2px;
`;

const StyledInputDate = styled.input`
  display: flex;
  font-size: 20px;
  width: 180px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: grey;
  margin-top: 5px;
`;

const StyledInputCVC = styled.input`
  display: flex;
  font-size: 20px;
  width: 100px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: grey;
  margin-top: 5px;
`;

const StyledConfirmButton = styled.button`
  background-color: #E0E0E0;
  position: absolute;
  left: 0;
  outline: none;
  border: none;
  width: 187px;
  height: 37px;
  margin-top: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;
