import { StyleSheet } from 'react-native'
import React from 'react'
import Container from '@/components/Settings/Container'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '@/constants/Colors';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style='auto' />
      <Container />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:color.white
  }
})