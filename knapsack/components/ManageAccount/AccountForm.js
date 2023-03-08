import { View, StyleSheet, Text, Alert } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { useState } from 'react';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

import Input from './Input';

function AccountForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

  const [inputs, setInputs] = useState({

    // name: 'Alpaca',
    // description: 'Trading account',
    // secretKey: 'Alpaca secret key',
    // apiEndPoint: 'API end point', 
    // createdDate: new Date('2021-12-19')
    name:{
      value: defaultValues ? defaultValues.name.toString() : '',
      isValid:true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    secretkey: {
      value: defaultValues ? defaultValues.secretkey : '',
      isValid: true,
    },
    apiendpoint: {
      value: defaultValues ? defaultValues.apiendpoint : '',
      isValid: true,
    },
    createddate: {
      value: defaultValues ? getFormattedDate(defaultValues.createddate) : '',
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
    const accountData = {
      name: inputs.name.value,
      description: inputs.description.value,      
      secretkey: inputs.secretkey.value,      
      apiendpoint: inputs.apiendpoint.value,
      createddate: new Date(inputs.createddate.value),
    };

    // const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const nameIsValid = accountData.name.trim().length > 0

    const dateIsValid = accountData.createddate.toString() !== 'Invalid Date';
    const descriptionIsValid = accountData.description.trim().length > 0;
    const secretKeyIsValid = accountData.secretkey.trim().length > 0;
    const apiendpointIsValid = accountData.apiendpoint.trim().length > 0;

    if (!dateIsValid || !descriptionIsValid || !nameIsValid || !secretKeyIsValid || !apiendpointIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          createddate: { value: curInputs.createddate.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          secretkey: {
            value: curInputs.secretkey.value,
            isValid: secretKeyIsValid,
          },
          apiendpoint: {
            value: curInputs.apiendpoint.value,
            isValid: apiendpointIsValid,
          },
        };
      });
      return;
    }

    onSubmit(accountData);
  }

  const formIsInvalid =
  !inputs.name.isValid ||
  !inputs.secretkey.isValid ||
  !inputs.apiendpoint.isValid ||
  !inputs.createddate.isValid ||
  !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Account</Text>
      <Input
        label="Account Name"
        invalid={!inputs.name.isValid}
        textInputConfig={{
          multiline: false,
          onChangeText: inputChangedHandler.bind(this, 'name'),
          value: inputs.name.value,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
      <Input
        label="Secret Key"
        invalid={!inputs.secretkey.isValid}
        textInputConfig={{
          multiline: false,
          value: inputs.secretkey.value,
          onChangeText: inputChangedHandler.bind(this, 'secretkey'),
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />
      <Input
        label="Api endpoint"
        invalid={!inputs.secretkey.isValid}
        textInputConfig={{
          multiline: false,
          value: inputs.apiendpoint.value,
          onChangeText: inputChangedHandler.bind(this, 'apiendpoint'),
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
        }}
      />      
      <Input
        label="Created Date"
        invalid={!inputs.createddate.isValid}
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          value: inputs.createddate.value,
          onChangeText: inputChangedHandler.bind(this, 'createddate'),
        }}
      />      
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

export default AccountForm;

const styles = StyleSheet.create({
  form: {
    marginTop: -5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
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
});