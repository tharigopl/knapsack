import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../constants/styles';
import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
//import {Linking} from 'expo-linking';
//import * as Linking from 'expo-linking';
export default function StripeUserOnboarding1({route, navigation}) {

    const [url, setUrl] = useState('');

    //const urltemp = Linking.useURL();

    console.log("StripeUserOnboarding1",route.params);
    useEffect(()=>{
		setUrl(route.params.accountSetupUrl.url);
	}, [])

  return (  
    <View style={styles.container}>
      <WebView source={{uri:url}}></WebView>
    </View>  
  )
}

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