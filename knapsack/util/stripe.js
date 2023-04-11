import axios from 'axios';
import { API_URL_SERVER } from '../Config';
import {MONGO_STRIPE_API_URL} from '../Config';
import {Linking} from 'react-native';

//const BACKEND_URL = 'https://uwunm-fe912-default-rtdb.firebaseio.com';

const BACKEND_URL =  'https://wunme-53e1d-default-rtdb.firebaseio.com/';
const BACKEND_URL_STRIPE =  'http://localhost:3000/';
  

export async function signUpStripe(userData) {   
  // userData['name'] = "AQATest123123AAA1";
  // userData['password'] = "QTest1231231!AAA";
  // userData['email'] = "AQAtest123123AAA1@gmail.com";


  console.log("Stripe URL ", MONGO_STRIPE_API_URL, userData);

  const response = await axios.post(MONGO_STRIPE_API_URL+'/signup', userData).catch(function (error) {
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
  console.log("Signup Stripe account", response.data);
  console.log("Stripe Respose ", response);  
  //await Linking.openURL(response.data.user.accountLink.url);
  
  return response.data;
}

export async function stripeDashboard(stripeAccountId) {   
  
  console.log(stripeAccountId);
  //const requestData = {username:"sample", password:"sample1", email:"sample@gmail.com"};
  //console.log("Stripe Request Data ",requestData);

  console.log("Stripe URL ", MONGO_STRIPE_API_URL);
  const response = await axios.get(process.env.REACT_APP_STRIPE_BACKEND_URL + '/hosts/udashboard', stripeAccountId).catch(function (error) {
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