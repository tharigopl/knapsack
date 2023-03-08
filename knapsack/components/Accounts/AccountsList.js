import { FlatList, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

import AccountItem from './AccountItem';

function renderAccountItem(itemData) {
  return <AccountItem {...itemData.item} />;
}

function AccountsList({ accounts, fallbackText }) {

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  function emptyAccounts(){
    return(
      <View style={styles.container}>
      <Text style={styles.infoText}>{fallbackText}</Text>
      </View>
    )
  } 

  return (
    <FlatList
      data={accounts}
      renderItem={renderAccountItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={emptyAccounts}
    />
  );
}

export default AccountsList;

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