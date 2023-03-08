import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {createUser} from '../util/auth';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);


  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}){
    setIsAuthenticating(true);
    try{      
      const user = await createUser(email, password);
      console.log("SignUp Screen ", user.idToken);
      authCtx.authenticate(user.idToken);
    }catch(error){
      Alert.alert('Authentication failed!', 'Could not create user, please check your input and try again later!');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
