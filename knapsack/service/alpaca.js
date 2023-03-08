import axios from 'axios';

//const BACKEND_URL = 'https://uwunm-fe912-default-rtdb.firebaseio.com';

const BACKEND_URL =  'https://broker-api.sandbox.alpaca.markets';
const api_key = 'CKPGRA83DOVC05VDVVVJ';
const api_secret = 'DoapYmMlNy1JYhFyE0TEoeljDbETeS5nAnyXrRWm';
  

export async function createAccount(userData, token) {  
  const response = await axios.post(BACKEND_URL + '/expenses.json?auth='+ token, userData).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
  const id = response.data.name;
  return id;
}

export async function getAllAssets(userData, token) {  
  const response = await axios.post(BACKEND_URL + '/expenses.json?auth='+ token, userData).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
  const id = response.data.name;
  return id;
}

