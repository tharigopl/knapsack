import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { stripeDashboard } from '../util/stripe';

export default function StripeDashboard() {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const [sDashboard, setSDashboard] = useState({});

    useEffect(() => {
        console.log("Stripe Dashboard UseEffect");
        async function getStripeDashboard() {
            setIsFetching(true);
            try {
            const stripeDash = await stripeDashboard("acct_1Ml6DKIPl3jN0ApB")
            //setFetchedAccounts(accounts);
            setSDashboard(stripeDash);
            
            
            } catch (error) {
                setError('Could not fetch dashoard!');
            }
            setIsFetching(false);
        }

        getStripeDashboard();
        }, []);


  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

const styles = StyleSheet.create({})