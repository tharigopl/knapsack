import { Alert } from "react-native";
import { API_URL } from "./Config";

export async function fetchPublishableKey(){
    try{
        const response = await fetch(`${API_URL}/config`);
        console.log("$$$$$$$$",response)
        const {publishableKey} = await response;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!! Publishable Key", publishableKey);
        return publishableKey;
    }
    catch(err){
        console.log(err);
        console.warn('Unable to fetch publishable key. Is your server running?');
        Alert.alert('Error', 'Unable to fetch publishable key. Is your server running?');
    }
}