import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { AccountsContext } from '../store/accounts-context';
import AccountForm from '../components/ManageAccount/AccountForm';
import { deleteAccount, storeAccount, updateAccount } from '../util/http';
import { AuthContext } from '../store/auth-context';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';


function ManageAccount({ route, navigation }) {
  const editedAccountId = route.params?.accountId;

console.log("Inside Manage Account  "+ editedAccountId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();


  const isEditing = !!editedAccountId;
  console.log("Inside Manage Account  ",isEditing);
  const accountsCtx = useContext(AccountsContext);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  if(isEditing){

  }
  const selectedAccount = isEditing ? accountsCtx.accounts.find(
    (account) => account.id === editedAccountId
  ):'';

  console.log(" selectedAccount ",selectedAccount);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Account' : 'Add Account',
    });
  }, [navigation, isEditing]);


  async function deleteAccountHandler() {
    setIsSubmitting(true);
    try {
      await deleteAccount(editedAccountId, token);
      accountsCtx.deleteAccount(editedAccountId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(accountData) {
   

  setIsSubmitting(true);
    try {
      if (isEditing) {
        accountsCtx.updateAccount(editedAccountId, accountData);
        await updateAccount(editedAccountId, accountData, token);
      } else {
        const id = await storeAccount(accountData);
        console.log(" Stored Accont  ",id, accountData);
        accountsCtx.addAccount({ ...accountData, id: id });
        console.log(" Stored Accont 1 !!!!!!!!!@@@@@ ",accountsCtx.accounts);
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }


  return (
    <View style={styles.container}>
      <AccountForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedAccount}
      />      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteAccountHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageAccount;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary800,
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
    deleteContainer: {
      marginTop: 16,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: GlobalStyles.colors.primary200,
      alignItems: 'center',
    },
  });
  