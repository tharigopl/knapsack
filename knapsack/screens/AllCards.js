import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import ListItem from '../components/ListItem';
import { GlobalStyles } from '../constants/styles';


export default function AllCards() {
    const navigation = useNavigation();
  return (
   <ScrollView>
    <View style={styles.container}>
        <Button 
            title='Card'
            onPress={()=>{
                navigation.navigate('CardScreen');
            }}
        />
        <Button 
            title='Payment'
            onPress={()=>{
                navigation.navigate('Payment');
            }}
        />
        <Button 
            title='PaymentScreen'
            onPress={()=>{
                navigation.navigate('PaymentScreen');
            }}
        />
    </View>
   </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //paddingHorizontal:20,
        //paddingVertical:35,
         paddingTop: 40,
         paddingBottom: 20,
         paddingLeft: 20,
         paddingRight: 20,
        backgroundColor: GlobalStyles.colors.primary800,
      },
})