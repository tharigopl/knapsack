import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import { ScrollView } from 'react-native-gesture-handler';

function StripeUserForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }){
    
    const [inputs, setInputs] = useState({
        name: {
          value: defaultValues ? defaultValues.name : '',
          isValid: true,
        },
        email: {
            value: defaultValues ? defaultValues.email : '',
            isValid: true,
          },
        password: {
          value: defaultValues ? defaultValues.password : '',
          isValid: true,
        }
      });

      function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
          return {
            ...curInputs,
            [inputIdentifier]: { value: enteredValue, isValid: true },
          };
        });
      }
    
      function submitHandler() {
        const stripeUserData = {
            name:inputs.name.value,
            email:inputs.email.value,
            password:inputs.password.value,
        };
        console.log("Stripe User Form Submit", stripeUserData);
        // const firstNameIsValid = stripeUserData.firstName.trim().length > 0;
        // const lastNameIsValid = stripeUserData.lastName.trim().length > 0;
        // //const middleNameIsValid = stripeUserData.middleName.trim().length > 0;
        // const emailIsValid = stripeUserData.email.trim().length > 0;
        // const stripeUsernameIsValid = stripeUserData.stripeUsername.length > 0;
        // const phonenoIsValid = stripeUserData.phoneno.trim().length > 0;        
        // const passwordIsValid = stripeUserData.password.trim().length > 0;
        // //const stripeAccountIdIsValid = stripeUserData.stripeAccountId.trim().length > 0;
        // const countryIsValid = stripeUserData.country.trim().length > 0;
        // console.log("Stripe User Form Submit 1", stripeUserData);
        // if (!firstNameIsValid || !lastNameIsValid || !emailIsValid || !phonenoIsValid ||
        //     !phonenoIsValid || !passwordIsValid || !countryIsValid) {
        //   console.log('Invalid input', 'Please check your input values');
        //   setInputs((curInputs) => {
        //     return {

        //       firstName: {value:curInputs.firstName.value, isValid: firstNameIsValid},
        //         lastName: {value:curInputs.lastName.value, isValid: lastNameIsValid},
        //         middleName: {value:curInputs.middleName.value},
        //         email: {value:curInputs.email.value, isValid: emailIsValid},
        //         phoneno: {value:curInputs.phoneno.value, isValid: phonenoIsValid},
        //         stripeUsername: {value:curInputs.stripeUsername.value, isValid: stripeUsernameIsValid},
        //         password: {value:curInputs.password.value, isValid: passwordIsValid},
        //         stripeAccountId: {value:curInputs.stripeAccountId.value},
        //         country: {value:curInputs.country.value, isValid: countryIsValid},
        //     };
        //   });
        //   return;
        // }
        setInputs((curInputs) => {
          return {
              name: {value:curInputs.name.value, isValid: true},              
              email: {value:curInputs.email.value, isValid: true},
              password: {value:curInputs.password.value, isValid: true},
          }
        });
        console.log("before submit");
        onSubmit(stripeUserData);
      }
    
      const formIsInvalid = !inputs.name.isValid || !inputs.email.isValid || !inputs.password.isValid;

    return(
        <ScrollView style={styles.scroll}>
        <View style={styles.form}>
            <Text style={styles.title}>Stripe User Details</Text>
            <View>
                <Input
                label="User Name"
                invalid={!inputs.name.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'name'),
                    value: inputs.name.value,
                }}
                />             
                <Input
                    label="Email"
                    invalid={!inputs.email.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'email'),
                    value: inputs.email.value,
                    }}
                />
                <Input
                    label="Stripe Password"
                    invalid={!inputs.password.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'password'),
                    value: inputs.password.value,
                    }}
                />
            </View>        
            {formIsInvalid && (
                <Text style={styles.errorText}>
                Invalid input values - please check your entered data!
                </Text>
            )}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                {submitButtonLabel}
                </Button>
            </View>
        </View>
        </ScrollView>
    );
}

export default StripeUserForm;

const styles = StyleSheet.create({
    form: {
      marginTop: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 0,
      textAlign: 'center',
    },
    inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowInput: {
      flex: 1,
    },
    errorText: {
      textAlign: 'center',
      color: GlobalStyles.colors.error500,
      margin: 8,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      minWidth: 120,
      marginHorizontal: 8,
    },
    scroll: {
        backgroundColor: '#FFF',
      },
  });