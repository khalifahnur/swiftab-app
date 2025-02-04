import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeScreen from '@/components/Auth/WelcomeScreen'
import { StatusBar } from 'expo-status-bar'
import { color } from '@/constants/Colors'

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.green}/>
      <WelcomeScreen />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})