import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';
import { GlobalStyles } from '../../constants/styles';

function ContactForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  console.log("Contact Form", defaultValues);

  const [inputs, setInputs] = useState({
    firstname: {
      value: defaultValues ? defaultValues.firstname : '',
      isValid: true,
    },
    lastname: {
      value: defaultValues ? defaultValues.lastname : '',
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
    const contactData = {
      firstname: inputs.firstname.value,
      lastname: inputs.lastname.value,
      email: inputs.email.value,
      phoneno: inputs.phoneno.value,
    };

    const firstnameIsValid = contactData.firstname.trim().length > 0;
    const lastnameIsValid = contactData.lastname.trim().length > 0;
    const emailIsValid = contactData.email.trim().length > 0;
    const phonenoIsValid = contactData.phoneno.trim().length > 0;

    if (!firstnameIsValid || !lastnameIsValid || !emailIsValid || !phonenoIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          firstname: { value: curInputs.firstname.value, isValid: firstnameIsValid },
          lastname: { value: curInputs.lastname.value, isValid: lastnameIsValid },
          email: { value: curInputs.email.value, isValid: emailIsValid},
          phoneno: { value: curInputs.phoneno.value, isValid: phonenoIsValid},
        };
      });
      return;
    }

    onSubmit(contactData);
  }

  const formIsInvalid =
    !inputs.firstname.isValid ||
    !inputs.lastname.isValid ||
    !inputs.email.isValid ||
    !inputs.phoneno.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Let's add a guest!</Text>
      <View style={styles.inputsRow}>
      <Input
        label="FirstName"
        invalid={!inputs.firstname.isValid}
        textInputConfig={{
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, 'firstname'),
          value: inputs.firstname.value,
        }}
      />
      <Input
          
          label="LastName"
          invalid={!inputs.lastname.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'lastname'),
            value: inputs.lastname.value,
          }}
        />
         <Input
          
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'email'),
            value: inputs.email.value,
          }}
        />
        <Input          
          label="Phoneno"
          invalid={!inputs.phoneno.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'phoneno'),
            value: inputs.phoneno.value,
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
  );
}

export default ContactForm;

const styles = StyleSheet.create({
  form: {
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'column',
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
});
