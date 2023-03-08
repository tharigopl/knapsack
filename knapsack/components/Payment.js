import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { useStripe } from '@stripe/stripe-react-native'
import { useContext, useEffect, useState } from 'react';
import { API_URL } from "../Config";
import { GlobalStyles } from '../constants/styles';

const Payment = () => {
    const [name, setName] = useState('');
    const stripe = useStripe();

    const subscribe = async () => {
        try{
            console.log(API_URL);
            const response = await fetch(API_URL+"/pay", {
                method: "POST",
                body:JSON.stringify({name}),
                headers:{
                    "Content-Type":"application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) return Alert.alert(data.message);
            const clientSecret = data.clientSecret;
            const initSheet = await stripe.initPaymentSheet({
              paymentIntentClientSecret: clientSecret,
            });
            if (initSheet.error) return Alert.alert(initSheet.error.message);
            const presentSheet = await stripe.presentPaymentSheet({
              clientSecret,
            });
            if (presentSheet.error) return Alert.alert(presentSheet.error.message);
            Alert.alert("Payment complete, thank you!");
        }
        catch(err){
            console.log(err);
            Alert.alert("Error subscribing");
        }
    }

  return (
    <View style={styles.payment}>
        <TextInput value={name} onChangeText={
            text => setName(text)            
        }
        placeholder = "Name"
        ></TextInput>
        <Button title="Subscribe" onPress={subscribe} />
      <Text>Payment</Text>
    </View>
  )
}

export default Payment;

const styles = StyleSheet.create({
    payment: {
      marginTop: 64,
      marginHorizontal: 32,
      padding: 16,
      borderRadius: 8,
      backgroundColor: GlobalStyles.colors.primary800,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    buttons: {
      marginTop: 8,
    },
  });