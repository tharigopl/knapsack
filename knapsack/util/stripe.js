import axios from 'axios';
import { API_URL_SERVER } from '../Config';
import {MONGO_STRIPE_API_URL} from '../Config';

//const BACKEND_URL = 'https://uwunm-fe912-default-rtdb.firebaseio.com';

const BACKEND_URL =  'https://wunme-53e1d-default-rtdb.firebaseio.com/';
const BACKEND_URL_STRIPE =  'http://localhost:3000/';
  

export async function signUpStripe(userData) {   
  userData['password'] = "Tharigopla123";  
  userData['country'] = "US";  
  userData['firstName'] = "Adrian";
  userData['lastName'] = "Tarigopla";
  console.log(userData);
  //const requestData = {username:"sample", password:"sample1", email:"sample@gmail.com"};
  //console.log("Stripe Request Data ",requestData);

  console.log("Stripe URL ", MONGO_STRIPE_API_URL);
  const response = await axios.post(MONGO_STRIPE_API_URL + '/hosts/usignup', userData).catch(function (error) {
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
  //console.log("Stripe Respose ",response);
  const id = response.data.name;
  return id;
}

export async function stripeDashboard(stripeAccountId) {   
  
  console.log(stripeAccountId);
  //const requestData = {username:"sample", password:"sample1", email:"sample@gmail.com"};
  //console.log("Stripe Request Data ",requestData);

  console.log("Stripe URL ", MONGO_STRIPE_API_URL);
  const response = await axios.get(MONGO_STRIPE_API_URL + '/hosts/udashboard', stripeAccountId).catch(function (error) {
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
  //console.log("Stripe Respose ",response);
  const id = response.data.name;
  return id;
}