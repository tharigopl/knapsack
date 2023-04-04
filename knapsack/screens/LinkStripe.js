import { StyleSheet, Text, View, KeyboardAvoidingView, Linking } from 'react-native'
import StripeUserForm  from "../components/ManageStripeUser/StripeUserForm";
import React from 'react'
import { GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { StripeUserContext } from '../store/stripe-context';
import { httpRequest } from '@alpacahq/alpaca-trade-api/dist/api';
import { signUpStripe } from '../util/stripe';
//import * as WebBrowser from 'expo-web-browser';

export default function LinkStripe({ route, navigation }) {

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();


  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const stripeUserCtx = useContext(StripeUserContext);
  console.log("Linkstripe Ctx",stripeUserCtx.stripeusers);

  const editedStripeUserId = route.params?.editedStripeUserId;
  const isEditing = !!editedStripeUserId;

  const selectedStripeUser = stripeUserCtx.stripeusers.find(
    (user) => user.id === editedUserId
  );

  // const selectedUser = stripeUserCtx.stripeusers[0];
  //console.log("Linkstripe Edited User Id", editedUserId);
  console.log("Linkstripe Edited User", selectedStripeUser);
  
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Stripe User' : 'Add Stripe User',
    });
  }, [navigation, isEditing]);


  


  function cancelHandler() {
      navigation.goBack();
    }
  
    async function confirmHandler(userData) {
      console.log("Confirm Handler Link Stripe", userData);
      try {
        if (true) {          
          const stripeUserData = await signUpStripe(userData);
          console.log("*******************  Stripe User Data  ***********************",stripeUserData.user);
          // let result = await WebBrowser.openBrowserAsync(stripeUserData.user.accountLink.url);
          // setResult(result);
          // console.log("Result ",result);
          //await Linking.openURL(stripeUserData.user.accountLink.url);

          navigation.navigate("StripeUserOnboarding1", {
            accountSetupUrl: stripeUserData.user.accountLink
          });
          //stripeUserCtx.addStripeUser()
        } else {
          //userCtx.addUser({ ...userData, id: id });
        }
        //await signUpStripe();
        
      } catch (error) {
        console.log("Error Stripe", error);
       /*  setError('Could not save data - please try again later!');
        setIsSubmitting(false); */
      }
    }


return (
  <KeyboardAvoidingView style={styles.container}>
    <StripeUserForm
      submitButtonLabel={isEditing ? 'Update' : 'Add'}
      onSubmit={confirmHandler}
      onCancel={cancelHandler}
      defaultValues={selectedStripeUser}
    />

  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
      },
      infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
      },
})