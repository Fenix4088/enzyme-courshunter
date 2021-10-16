import axios from 'axios';


export const getSecretWord = async (setSecretWord) => {
  const resp = await axios.get('http://localhost:3030');
  setSecretWord(resp.data);
}