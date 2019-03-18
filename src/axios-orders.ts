import axios from 'axios';

const orders = axios.create({
  baseURL: 'http://localhost:8080'
});

export default orders;
