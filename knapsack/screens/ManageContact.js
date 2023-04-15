import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import ContactForm from '../components/ManageContact/ContactForm'
import { GlobalStyles } from '../constants/styles';
import { PartiesContext } from '../store/parties-context';
import { AuthContext } from '../store/auth-context';
import { storeContact, updateContact, deleteContact } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import IconButton from '../components/ui/IconButton';

export default function ManageContact({ route, navigation }) {

    const editedContactId = route.params?.contactId;

console.log("Inside Manage Contact  "+ editedContactId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();


  const isEditing = !!editedContactId;
  console.log("Inside Manage Contact  ",isEditing);
  const partiesCtx = useContext(PartiesContext);

  const authCtx = useContext(AuthContext);
  const uid = authCtx.uid;
  const token = authCtx.token;
  if(isEditing){

  }
  const selectedContact = isEditing ? partiesCtx.contacts.find(
    (contact) => contact.id === editedContactId
  ):'';

  console.log(" selectedContact ",selectedContact);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Contact' : 'Add Contact',
    });
  }, [navigation, isEditing]);


  async function deleteContactHandler() {
    setIsSubmitting(true);
    try {
      await deleteContact(editedContactId, token);
      partiesCtx.deleteContact(editedContactId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(contactData) {
    contactData['uid'] = uid;

  setIsSubmitting(true);
    try {
      if (isEditing) {
        console.log("Update Contact");
        partiesCtx.updateContact(editedContactId, contactData);
        await updateContact(editedContactId, contactData, token);
      } else {
        console.log("Store Contact");
        const id = await storeContact(contactData, token);
        console.log(" Stored Contact  ",id, contactData);
        partiesCtx.addContact({ ...contactData, id: id });
        console.log(" Stored Contact 1 !!!!!!!!!@@@@@ ",partiesCtx.contacts);
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
    <View>
      <Text>ManageContact</Text>
      <ContactForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedContact}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteContactHandler}
          />
        </View>
      )}
    </View>
  )
}

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