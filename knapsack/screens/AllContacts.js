import { useContext, useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import ContactsOutput from '../components/AllContactsOutput/ContactsOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { fetchContacts } from '../util/http';
import { AuthContext } from '../store/auth-context';
import { PartiesContext } from '../store/parties-context';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';

function AllContacts({navigation}) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const partiesCtx = useContext(PartiesContext);
  const token = authCtx.token;
  const uid = authCtx.uid;
  useEffect(() => {
    async function getContacts() {
      setIsFetching(true);
      try {
        const contacts = await fetchContacts(token, uid);        
        partiesCtx.setContacts(contacts);
      } catch (error) {
        setError('Could not fetch contacts!');
      }
      setIsFetching(false);
    }

    getContacts();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }


  const contacts = partiesCtx.contacts;
  console.log("contacts ", contacts);

  function submitHandler() {
    console.log("Add Contact Clicked");
    navigation.navigate('ManageContact');
  }


  return (
    <View style={styles.container}>
    <ContactsOutput
      contacts={contacts}
      fallbackText="No registered contacts found!"
    />
    <Button style={styles.button} onPress={submitHandler}>
          Add Contact
        </Button> 
    </View>
  );
}

export default AllContacts;
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
  button:{
    paddingTop: 20
  },
});