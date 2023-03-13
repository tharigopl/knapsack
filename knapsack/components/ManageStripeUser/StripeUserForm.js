import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import { ScrollView } from 'react-native-gesture-handler';

function StripeUserForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }){
    console.log("Stripe User Date Received ", defaultValues);
    const [inputs, setInputs] = useState({
        firstName: {
          value: defaultValues ? defaultValues.firstName : '',
          isValid: true,
        },
        middleName: {
            value: defaultValues ? defaultValues.middleName : '',
            isValid: true,
          },
        lastName: {
          value: defaultValues ? defaultValues.lastName : '',
          isValid: true,
        },
        stripeUsername: {
          value: defaultValues ? defaultValues.stripeUsername : '',
          isValid: true,
        },
        email: {
            value: defaultValues ? defaultValues.email : '',
            isValid: true,
        },
        phoneno: {
            value: defaultValues ? defaultValues.phoneno : '',
            isValid: true,
        },
        password: {
            value: defaultValues ? defaultValues.password : '',
            isValid: true,
        },
        stripeAccountId: {
            value: defaultValues ? defaultValues.stripeAccountId : '',
            isValid: true,
        },
        country: {
            value: defaultValues ? defaultValues.country : '',
            isValid: true,
        },
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
            firstName:inputs.firstName.value,
            lastName:inputs.lastName.value,
            middleName:inputs.middleName.value,
            email:inputs.email.value,
            stripeUsername:inputs.stripeUsername.value,
            phoneno:inputs.phoneno.value,
            password:inputs.password.value,
            stripeAccountId:inputs.stripeAccountId.value,
            country:inputs.country.value,
        };
        console.log("Stripe User Form Submit", stripeUserData);
        const firstNameIsValid = stripeUserData.firstName.trim().length > 0;
        const lastNameIsValid = stripeUserData.lastName.trim().length > 0;
        //const middleNameIsValid = stripeUserData.middleName.trim().length > 0;
        const emailIsValid = stripeUserData.email.trim().length > 0;
        const stripeUsernameIsValid = stripeUserData.stripeUsername.length > 0;
        const phonenoIsValid = stripeUserData.phoneno.trim().length > 0;        
        const passwordIsValid = stripeUserData.password.trim().length > 0;
        //const stripeAccountIdIsValid = stripeUserData.stripeAccountId.trim().length > 0;
        const countryIsValid = userData.country.trim().length > 0;
        console.log("Stripe User Form Submit 1", userData);
        if (!firstNameIsValid || !lastNameIsValid || !emailIsValid || !phonenoIsValid ||
            !phonenoIsValid || !passwordIsValid || !countryIsValid) {
          console.log('Invalid input', 'Please check your input values');
          setInputs((curInputs) => {
            return {

              firstName: {value:curInputs.firstName.value, isValid: firstNameIsValid},
                lastName: {value:curInputs.lastName.value, isValid: lastNameIsValid},
                middleName: {value:curInputs.middleName.value},
                email: {value:curInputs.email.value, isValid: emailIsValid},
                phoneno: {value:curInputs.phoneno.value, isValid: phonenoIsValid},
                stripeUsername: {value:curInputs.stripeUsername.value, isValid: stripeUsernameIsValid},
                password: {value:curInputs.password.value, isValid: passwordIsValid},
                stripeAccountId: {value:curInputs.stripeAccountId.value},
                country: {value:curInputs.country.value, isValid: countryIsValid},
            };
          });
          return;
        }
        console.log("before submit");
        onSubmit(userData);
      }
    
      const formIsInvalid = !inputs.firstName.isValid || !inputs.lastName.isValid || !inputs.email.isValid || !inputs.phoneno.isValid ||
       !inputs.stripeUsername.isValid || !inputs.password.isValid || !inputs.country.isValid;

    return(
        <ScrollView style={styles.scroll}>
        <View style={styles.form}>
            <Text style={styles.title}>Stripe User Details</Text>
            <View>
                <Input
                label="First Name"
                invalid={!inputs.firstName.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'firstName'),
                    value: inputs.firstName.value,
                }}
                />
                <Input
                label="Middle Name"
                invalid={!inputs.middleName.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'middleName'),
                    value: inputs.middleName.value,
                }}
                />
                <Input
                label="Last Name"
                invalid={!inputs.lastName.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'lastName'),
                    value: inputs.lastName.value,
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
                    label="Phone No"
                    invalid={!inputs.phoneno.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'phoneno'),
                    value: inputs.phoneno.value,
                    }}
                />
                <Input
                    label="Stripe User Name"
                    invalid={!inputs.stripeUsername.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'stripeUsername'),
                    value: inputs.stripeUsername.value,
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
                <Input
                    label="Stripe Account Id"
                    invalid={!inputs.stripeAccountId.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'stripeAccountId'),
                    value: inputs.stripeAccountId.value,
                    }}
                />
                <Input
                    label="Country"
                    invalid={!inputs.country.isValid}
                    textInputConfig={{
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'country'),
                    value: inputs.country.value,
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