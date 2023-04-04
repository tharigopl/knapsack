import React, { useState } from 'react';
import { View, Button, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { useContext, useLayoutEffect, useEffect } from 'react';
import { GlobalStyles } from '../constants/styles';

const StripeUserOnboarding1 = ({ route, navigation }) => {
  const [webViewVisible, setWebViewVisible] = useState(true);


  const [url, setUrl] = useState('');

  //const urltemp = Linking.useURL();

  console.log("StripeUserOnboarding1",route.params);
  useEffect(()=>{
    setUrl(route.params.accountSetupUrl.url);
  }, []);

  const handleCloseWebView = () => {
    setWebViewVisible(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      {webViewVisible ? (
        <WebView
          source={{uri:url}}
          onShouldStartLoadWithRequest={() => true}
          onNavigationStateChange={navState => {
            if (navState.url === url+'/close') {
              handleCloseWebView();
            }
          }}
        />
      ) : (
        <Button title="Go to HomeScreen Screen" onPress={() => navigation.navigate('HomeScreen')} />
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 100,
      paddingBottom: 0,
      backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
      color: 'white',
      fontSize: 50,
      textAlign: 'center',
      marginTop: 32,
    },
})

export default StripeUserOnboarding1;

