import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import ContactsList from './ContactsList';
import ContactsSummary from './ContactsSummary';

function ContactsOutput({ contacts, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (contacts.length > 0) {
    content = <ContactsList contacts={contacts} />;
  }

  return (
    <View style={styles.container}>
      <ContactsSummary contacts={contacts} />
      {content}
    </View>
  );
}

export default ContactsOutput;

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
});
