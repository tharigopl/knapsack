import { createContext, useReducer } from 'react';


export const AccountsContext = createContext({
  accounts: [],
  addAccount: ({ name, description, secretKey, apiEndPoint, createdDate }) => {},
  setAccount: (accounts) => {},
  deleteAccount: (id) => {},
  updateAccount: (id, { name, description, secretKey, apiEndPoint, createdDate }) => {},
});

  function accountsReducer(state, action) {
    switch (action.type) {
      case 'ADD':
        return [action.payload, ...state];
      case 'SET':
        const inverted = action.payload.reverse();
        return inverted; 
      case 'UPDATE':
        const updatableAccountIndex = state.findIndex(
          (account) => account.id === action.payload.id
        );
        const updatableAccount = state[updatableAccountIndex];
        const updatedItem = { ...updatableAccount, ...action.payload.data };
        const updatedAccounts = [...state];
        updatedAccounts[updatableAccountIndex] = updatedItem;
        return updatedAccounts;
      case 'DELETE':
        return state.filter((account) => account.id !== action.payload);
      default:
        return state;
    }
  }
  


function AccountsContextProvider({ children }) {
    const [accountsState, dispatch] = useReducer(accountsReducer, []);
  
    function addAccount(accountData) {
      dispatch({ type: 'ADD', payload: accountData });
    }
  
    function setAccount(accounts) {
      dispatch({ type: 'SET', payload: accounts });
    }

    function deleteAccount(id) {
      dispatch({ type: 'DELETE', payload: id });
    }
  
    function updateAccount(id, accountData) {
      dispatch({ type: 'UPDATE', payload: { id: id, data: accountData } });
    }
  
    const value = {
      accounts: accountsState,
      addAccount: addAccount,
      setAccount:setAccount,
      deleteAccount: deleteAccount,
      updateAccount: updateAccount,
    };
  
    return (
      <AccountsContext.Provider value={value}>
        {children}
      </AccountsContext.Provider>
    );
  }
  
  export default AccountsContextProvider;