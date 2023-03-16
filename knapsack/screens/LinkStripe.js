import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import StripeUserForm  from "../components/ManageStripeUser/StripeUserForm";
import React from 'react'
import { GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { StripeUserContext } from '../store/stripe-context';
import { httpRequest } from '@alpacahq/alpaca-trade-api/dist/api';
import { signUpStripe } from '../util/stripe';

export default function LinkStripe({ route, navigation }) {

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();


  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const stripeUserCtx = useContext(StripeUserContext);
  console.log("Linkstripe Ctx",stripeUserCtx.stripeusers);

  const editedUserId = route.params?.editedUserId;
  const isEditing = !!editedUserId;

  // const selectedUser = userCtx.users.find(
  //   (user) => user.id === editedUserId
  // );
  const selectedUser = stripeUserCtx.stripeusers[0];
  //console.log("Linkstripe Edited User Id", editedUserId);
  console.log("Linkstripe Edited User", selectedUser);
  

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: isEditing ? 'Edit User' : 'Add User',
  //   });
  // }, [navigation, isEditing]);

  function cancelHandler() {
      navigation.goBack();
    }
  
    async function confirmHandler(userData) {
      console.log("Confirm Handler Link Stripe", userData);
      try {
        if (true) {          
          const stripeUserData = await signUpStripe(userData);
        } else {
          //userCtx.addUser({ ...userData, id: id });
        }
        //await signUpStripe();
        navigation.goBack();
      } catch (error) {
        console.log("Error Stripe");
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
      defaultValues={selectedUser}
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