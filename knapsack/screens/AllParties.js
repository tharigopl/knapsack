import { useContext, useState } from 'react';
import { View } from 'react-native';

import { PartiesContext } from '../store/parties-context';

function AllParties() {
  const expensesCtx = useContext(PartiesContext);
  
  return (
    <View></View>
  );
}

export default AllParties;
