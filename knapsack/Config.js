import {Platform} from 'react-native';

export const API_URL = Platform.OS === 'android' ? 'http://192.168.0.157:19000' : 'http://127.0.0.1:19000'
export const API_URL_SERVER = Platform.OS === 'android' ? 'http://192.168.0.157:4242' : 'http://127.0.0.1:4242'

//export const MONGO_STRIPE_API_URL = Platform.OS === 'android' ? 'http://192.168.0.157:3000' : 'http://127.0.0.1:3000'
export const MONGO_STRIPE_API_URL = Platform.OS === 'android' ? 'http://192.168.0.157:3000/api/stripeusers' : 'http://127.0.0.1:3000/api/stripeusers'
//export const MONGO_STRIPE_API_URL = Platform.OS === 'android' ? 'http://192.168.0.157:3000/hosts' : 'http://127.0.0.1:3000/hosts'
//https://stripebckend.herokuapp.com/api/stripeusers/
//export const MONGO_STRIPE_API_URL = Platform.OS === 'android' ? 'https://stripebckend.herokuapp.com/api/stripeusers' : 'https://stripebckend.herokuapp.com/api/stripeusers'