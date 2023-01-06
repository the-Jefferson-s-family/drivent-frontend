import styled from 'styled-components';

export default function GitHubAuth() {  
  return <BoxGitLogin>Log in with GitHub</BoxGitLogin>;
}

const BoxGitLogin = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    border-radius: 10px;
    color: white;
    background-color: black;
`;
