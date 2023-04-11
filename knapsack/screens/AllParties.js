import { useContext, useEffect, useState } from 'react';

import PartiesOutput from '../components/PartiesOutput/PartiesOutput';
import { PartiesContext } from '../store/parties-context';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { fetchParties } from '../util/http';
import { AuthContext } from '../store/auth-context';

function AllParties() {
  const partiesCtx = useContext(PartiesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const uid = authCtx.uid;
  console.log("Inside All UID in Parties Auth 1  ",uid);
  useEffect(() => {
    async function getParties() {
      setIsFetching(true);
      try {
        const parties = await fetchParties(token, uid);
        partiesCtx.setParties(parties);
        console.log("Inside All Parties Auth  ",partiesCtx.parties);
      } catch (error) {
        setError('Could not fetch parties!');
      }
      setIsFetching(false);
    }

    getParties();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const parties = partiesCtx.parties;
  console.log("Parties ", parties);
  return (
    <PartiesOutput
      parties={parties}
      partiesPeriod="Total"
      fallbackText="No registered parties found!"
    />
  );
}

export default AllParties;
