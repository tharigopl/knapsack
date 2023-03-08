import { View } from 'react-native';

import AccountsList from './AccountsList';

const DUMMY_ACCOUNTS = [
  {
    id: 'a1',
    name: 'Alpaca',
    description: 'Trading account',
    secretKey: 'Alpaca secret key',
    apiEndPoint: 'API end point', 
    createdDate: new Date('2021-12-19')
  },
  {
    id:'a2',
    name: 'Instagram',
    description: 'Social account',
    secretKey: 'Instagram secret key',
    apiEndPoint: 'Instagram API end point', 
    createdDate: new Date('2021-12-20')
  }
];

function AccountsOutput({ accounts }) {
  return (
    <View>
      <AccountsList accounts={accounts} />
    </View>
  );
}

export default AccountsOutput;
