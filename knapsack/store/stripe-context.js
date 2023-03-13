import { createContext, useReducer } from 'react';

export const StripeUserContext = createContext({
  stripeusers: [],
  addStripeUser: ({ fname, lname, mname, email, phoneno, street,
    unit,
    city,
    state,
    postalcode,
    country,
    dateofbirth,
    cntrytaxresidence,
    fundingsource}) => {},
  setStripeUsers: (stripeusers) => {},
  deleteStripeUser: (id) => {},
  updateStripeUser: (id, { fname, lname, mname, email, phoneno, street,
    unit,
    city,
    state,
    postalcode,
    country,
    dateofbirth,
    cntrytaxresidence,
    fundingsource }) => {},
});

function stripeUserReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableStripeUserIndex = state.findIndex(
        (stripeuser) => stripeuser.id === action.payload.id
      );
      const updatableStripeUser = state[updatableStripeUserIndex];
      const updatedItem = { ...updatableStripeUser, ...action.payload.data };
      const updatedStripeUsers = [...state];
      updatedStripeUsers[updatableStripeUserIndex] = updatedItem;
      return updatedStripeUsers;
    case 'DELETE':
      return state.filter((stripeuser) => stripeuser.id !== action.payload);
    default:
      return state;
  }
}

function StripeUsersContextProvider({ children }) {
  const [stripeUsersState, dispatch] = useReducer(stripeUserReducer, []);

  function addStripeUser(userData) {
    dispatch({ type: 'ADD', payload: userData });
  }

  function setStripeUsers(stripeusers) {
    dispatch({ type: 'SET', payload: stripeusers });
  }

  function deleteStripeUser(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateStripeUser(id, userData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: userData } });
  }

  const value = {
    stripeusers: stripeUsersState,
    setStripeUsers: setStripeUsers,
    addStripeUser: addStripeUser,
    deleteStripeUser: deleteStripeUser,
    updateStripeUser: updateStripeUser,
  };

  return (
    <StripeUserContext.Provider value={value}>
      {children}
    </StripeUserContext.Provider>
  );
}

export default StripeUsersContextProvider;
