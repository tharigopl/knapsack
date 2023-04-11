import AuthContent from '../components/Auth/AuthContent';
import {useState, useContext} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
//import { getAuth, onAuthStateChange, User } from '@react-native-firebase/auth';
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  //const auth = getAuth();

  //console.log("TEST", auth);
  async function loginHandler({email, password})
  {
    console.log("Process env ", process.env);
  console.log("Authenticate buttom ",email, password);
    setIsAuthenticating(true);
    try{
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log('User account created & signed in!');
          userCredentials.user.getIdToken().then((token) => {
            
            
            authCtx.authenticate(token);
            
          });          
          const ud = userCredentials.user.uid;
          console.log('TOKEN ', ud);
          authCtx.setUid(ud);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          Alert.alert("Authentication failed!","Could not log you in. Please check the credentials!")
          console.log(error);
          setIsAuthenticating(false);
        });
      
    }catch(error){
      Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later!');
      setIsAuthenticating(false);
    }    
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Loging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
