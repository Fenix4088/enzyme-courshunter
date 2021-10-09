import axios from 'axios';


export const getSecretWord = () => {
  return axios.get('http://localhost:3030').then(res => res.data)
}