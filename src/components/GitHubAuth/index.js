import styled from 'styled-components';
import queryString from 'query-string';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { set } from 'date-fns';
import { signIn } from '../../services/authApi';

export default function GitHubAuth() {
  const [render, setRender] = useState(false);

  const token = useAssincFunc();
  console.log('token :', token);

  return <BoxGitLogin onClick={redirectToGitHub}>
            Log in with GitHub
  </BoxGitLogin>;
}

function redirectToGitHub() {
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const CLIENT_ID = '4ce191c06dfa7e27c70a';
  const REDIRECT_URI = 'http://localhost:3001/sign-in/';
  const params = {
    response_type: 'code',
    scope: 'user public_repo',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI
  };  
  const qs = queryString.stringify(params);
  const authURL = `${GITHUB_URL}?${qs}`;

  console.log(' url to redirect to gith AUTH :', authURL);
  window.location.href = authURL;
}

function useAssincFunc() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const BACK_END_URL = process.env.REACT_APP_API_BASE_URL;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if(codeParam && (localStorage.getItem('accessToken') === null)) {
      axios.get(`${BACK_END_URL}auth/github/${codeParam}`)
        .then( (response) => { 
          localStorage.setItem('accessToken', response.data.access_token);
          setToken(response.data.access_token);
        } )
        .catch( (err) => console.log('erro requisicao : ', err));
    };
    if(token) {
      axios.get(`${BACK_END_URL}auth/github/signIn/${token}`)
        .then( (response) => {
          signInUserByGitHub(response.data);
        })
        .catch( (err) => console.log('erro requisicao : ', err));
    };
  }, [token]);

  return token;
} 

function signInUserByGitHub(userData) {
  console.log('userData :', userData);
};

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
