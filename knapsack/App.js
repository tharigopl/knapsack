import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './components/Payment';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/Profile/ProfileScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ManageExpense from './screens/ManageExpense';
import ManageAccount from './screens/ManageAccount';
import ManageContact from './screens/ManageContact';
import ManageUser from './screens/ManageUser';
import AllAccounts from './screens/AllAccounts';
import { Colors, GlobalStyles } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllCards from './screens/AllCards';
import AllContacts from './screens/AllContacts';
import ExpensesContextProvider from './store/expenses-context';
import AccountsContextProvider from './store/accounts-context';
import TasksContextProvider from './store/tasks-context';

import { Ionicons } from '@expo/vector-icons';

import IconButton from './components/ui/IconButton';
import UsersContextProvider from './store/user-context';
import StripeUsersContextProvider from './store/stripe-context';
import { fetchPublishableKey } from './helper';
import CardScreen from './screens/CardScreen';
import PaymentScreen from './screens/PaymentScreen';
import LinkStripe from './screens/LinkStripe';
import StripeUserOnboarding1 from './screens/StripeUserOnboarding1';
import StripeDashboard from './screens/StripeDashboard';
import ManageParty from './screens/ManageParty';
import AllParties from './screens/AllParties';
import PartiesContextProvider from './store/parties-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AllCards"
        component={AllCards}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="StripeDashboard"
        component={StripeDashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#3f2f25' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function ExpensesOverview() {
  return (
    
    <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}
        />
      ),
    })}
  >

      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
       <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ManageExpenses"
        component={ManageExpense}
        options={{
          title: 'Manage Expense',
          tabBarLabel: 'Manage Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function PartiesOverview() {
  return (
    
    <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate('ManageParty');
          }}
        />
      ),
    })}
  >

       <BottomTabs.Screen
        name="AllParties"
        component={AllParties}
        options={{
          title: 'All Parties',
          tabBarLabel: 'All Parties',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllContacts"
        component={AllContacts}
        options={{
          title: 'Contacts',
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ManageParties"
        component={ManageParty}
        options={{
          title: 'Manage Party',
          tabBarLabel: 'Manage Parties',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}


function AccountsOverview() {
  return (
    
    <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate('ManageAccount');
          }}
        />
      ),
    })}
  >


       <BottomTabs.Screen
        name="AllAccounts"
        component={AllAccounts}
        options={{
          title: 'All Accounts',
          tabBarLabel: 'All Accounts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ManageAccounts"
        component={ManageAccount}
        options={{
          title: 'Manage Account',
          tabBarLabel: 'Manage Accounts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function LinkStripeNavigator() {
  return (
    
    <BottomTabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate('LinkStripe');
          }}
        />
      ),
    })}
  >


       <BottomTabs.Screen
        name="LinkStripe"
        component={LinkStripe}
        options={{
          title: 'Link Stripe',
          tabBarLabel: 'Link Stripe',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthenticatedStack() {

  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#3f2f25' },
      }}
    >
      <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>,
            }}
          />          
      
      <Stack.Screen name="AllExpensesOverview" component={ExpensesOverview} options={{headerShown:false}}/>
      <Stack.Screen name="AllPartiesOverview" component={PartiesOverview} options={{headerShown:false}}/>
      <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ManageParty"
            component={ManageParty}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ManageContact"
            component={ManageContact}
            options={{
              presentation: 'modal',
            }}
          />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen name="AllAccounts1" component={AllAccounts} 
       options={{
        title: 'All Accounts',
      }}
      />
      <Stack.Screen name="AllAccountsOverview" component={AccountsOverview} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="LinkStripeAccount" component={LinkStripeNavigator} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="ManageUser" component={ManageUser} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="CardScreen" component={CardScreen} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="Payment" component={Payment} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="LinkStripe" component={LinkStripe} 
       options={{headerShown:false}}
      />
      <Stack.Screen name="StripeUserOnboarding1" component={StripeUserOnboarding1} 
       options={{headerShown:false}}
      />
      <Stack.Screen
            name="ManageAccount"
            component={ManageAccount}
            options={{
              presentation: 'modal',
            }}
          />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{
          title: 'About the Meal',
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {

  const authCtx = useContext(AuthContext);
  // const [publishableKey, setPublishableKey] = useState('');

  // useEffect(() => {
  //   async function init(){
  //     const publishableKey = await fetchPublishableKey();
  //     if(publishableKey){
  //       console.log('################## Publishable key', publishableKey)
  //       setPublishableKey(publishableKey);
  //     }else{
  //       console.log('Publishable key error')
  //     }
  //   }
  // })

  return (
      // <StripeProvider publishableKey={publishableKey}>
      //   <CardScreen />
        <UsersContextProvider>
          <StripeUsersContextProvider>
            <PartiesContextProvider>
          <AccountsContextProvider>
          <ExpensesContextProvider>
          <TasksContextProvider>
            <NavigationContainer>
              {!authCtx.isAuthenticated && <AuthStack />}
              {authCtx.isAuthenticated && <AuthenticatedStack />}
            </NavigationContainer>
            </TasksContextProvider>
          </ExpensesContextProvider>
          </AccountsContextProvider>
          </PartiesContextProvider>
          </StripeUsersContextProvider>
        </UsersContextProvider>
      // </StripeProvider>
     
  );
}

function Root(){
  const [isTryLogin, setIsTryLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken(){            
        const storedToken = await AsyncStorage.getItem('token');
        if(storedToken){
            authCtx.authenticate(storedToken);
        }
        setIsTryLogin(false);
    }
    fetchToken();
  }, []);

  const [publishableKey, setPublishableKey] = useState('');

  // useEffect(() => {
  //   async function init(){
  //     const publishableKey = await fetchPublishableKey();
  //     if(publishableKey){
  //       console.log('################## Publishable key', publishableKey)
  //       setPublishableKey(publishableKey);
  //     }else{
  //       console.log('Publishable key error')
  //     }
  //   }
  //   init();
  // })

  if(isTryLogin){
    return <AppLoading />;
  }
  return (
    <StripeProvider publishableKey='pk_test_51MfwOdIG1pb0YbjaCLWZMdycVQH2T9qAxPor8ZbqMNg1MBKwYYlWCwtjdozSqCOfT2yTfULEIgDy3khfCqp07NcT0058OOSqK6'>
    <Navigation></Navigation>
    </StripeProvider>
  
  );
}

export default function App() {

  

  return (
    <>
      <StatusBar style="light" />      
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
      {/* <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              title: 'About the Meal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
