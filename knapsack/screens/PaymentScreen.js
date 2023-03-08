import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe, useConfirmPayment, BillingDetails } from '@stripe/stripe-react-native';
import { GlobalStyles } from '../constants/styles';
import { API_URL_SERVER } from '../Config';

export default function PaymentScreen() {
    const {confirmPayment, loading} = useConfirmPayment();
    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL_SERVER}/create-payment-intent`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            currency: 'usd',
            }),
        });
        const {clientSecret} = await response.json();

        return clientSecret;
    };

    const handlePayPress = async () => {
        // Gather the customer's billing information (for example, email)
        const billingDetails: BillingDetails = {
          email: 'jenny.rosen@example.com',
        };
    
        // Fetch the intent client secret from the backend
        const clientSecret = await fetchPaymentIntentClientSecret();
    
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        });
    
        if (error) {
          console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
          console.log('Success from promise', paymentIntent);
        }
      };    

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
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