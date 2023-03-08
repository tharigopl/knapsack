import AccountsOutput from '../components/Accounts/AccountsOutput';
import AccountsList from '../components/Accounts/AccountsList';
import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../store/accounts-context';
import { fetchAccounts } from '../util/http';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';


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

function AllAccounts() {
  const accountsCtx = useContext(AccountsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

    //const [fetchedAccounts, setFetchedAccounts] = useState([]);
  

  const authCtx = useContext(AuthContext);
    const token = authCtx.token;

  useEffect(() => {
    async function getAccounts() {
      setIsFetching(true);
      try {
        console.log("Inside All Accounts "+token);
        const accounts = await fetchAccounts(token);
        //setFetchedAccounts(accounts);
        console.log("Inside All Accounts 99999 ",accounts);
        accountsCtx.setAccount(accounts);
        console.log("Inside All Accounts Auth  ",accountsCtx.accounts);
      } catch (error) {
        setError('Could not fetch accounts!');
      }
      setIsFetching(false);
    }

    getAccounts();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const allAccounts = accountsCtx.accounts;
  //const fetchedAccs = fetchedAccounts;

  return (
    // <AccountsList accounts={accountsCtx.accounts} fallbackText="No registered account found!"></AccountsList>
    <AccountsOutput
      accounts={allAccounts}
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllAccounts;
