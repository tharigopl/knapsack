import {Platform} from 'react-native';

export const API_URL = Platform.OS === 'android' ? 'http://192.168.0.157:19000' : 'http://127.0.0.1:19000'
export const API_URL_SERVER = Platform.OS === 'android' ? 'http://192.168.0.157:4242' : 'http://127.0.0.1:4242'