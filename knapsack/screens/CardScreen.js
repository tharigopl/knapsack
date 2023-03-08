import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert } from 'react-native'
import React, {useState} from 'react'
import { GlobalStyles } from '../constants/styles'
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import { API_URL } from '../Config';
import { API_URL_SERVER } from '../Config';
import { StripeProvider } from '@stripe/stripe-react-native';


export default function CardScreen() {
    const [name, setName] = useState('');
    const {confirmPayment, loading} = useConfirmPayment()
    const handlePayPress = async () => {
        try{
            const response = await fetch(`${API_URL_SERVER}/create-payment-intent`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    paymentMethodType: 'card',
                    currency:'usd'
                })
            })
            console.log('#############3', response)
            const {clientSecret} = await response.json();
    
            const {error, paymentIntent} = await confirmPayment(clientSecret, {
                type:'Card',
                billingDetails: {name}
            })
    
            if(error){
                Alert.alert(`Error code: ${error.code}`, error.message)
            }else if(paymentIntent){
                Alert.alert('Success', `Payment successful: ${paymentIntent.id}`)
            }
        }catch(error){

        }
        
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput 
                autoCapitalize='none'
                placeholder='Name'
                keyboardType='name-phone-pad'
                onChange={(value) => { setName(value.nativeEvent.text)}}
                style={styles.input}
            />
            <CardField 
                style={styles.cardField}    
                cardStyle={{
                    borderColor:'#000000',
                    borderWidth:1,
                    borderRadius: 8,
                }}
            />
            <Button title="Pay" onPress={handlePayPress} disabled={loading} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //paddingHorizontal:20,
        //paddingVertical:35,
         paddingTop: 40,
         paddingBottom: 20,
         paddingLeft: 20,
         paddingRight: 20,
        backgroundColor: GlobalStyles.colors.primary800,
      },
      cardField:{
        width:'100%',
        height:50,
        marginVertical: 30,
      },
      input:{
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
      }
})