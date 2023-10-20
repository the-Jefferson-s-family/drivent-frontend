import axios from 'axios';

// ARRUMAR 
// nao esta pegando a variavel do .envs

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

export default instance;
