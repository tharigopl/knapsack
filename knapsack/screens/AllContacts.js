import { useContext, useEffect, useState } from 'react';

import ContactsOutput from '../components/AllContactsOutput/ContactsOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { fetchContacts } from '../util/http';
import { AuthContext } from '../store/auth-context';

function AllContacts() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    async function getContacts() {
      setIsFetching(true);
      try {
        const contacts = await fetchContacts(token);        
        
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

  return (
    <ContactsOutput
      //contacts={contacts}
      fallbackText="No registered contacts found!"
    />
  );
}

export default AllContacts;
