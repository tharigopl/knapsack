import { FlatList } from 'react-native';

import ContactsItem from './ContactsItem';

function renderContactsItem(itemData) {
  console.log("Item Data",itemData);
  return <ContactsItem {...itemData.item} />;
}

function ContactsList({ contacts }) {
  return (
    <FlatList
      data={contacts}
      renderItem={renderContactsItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ContactsList;
