import { StyleSheet } from 'react-native'
import React from 'react'
import Container from '@/components/Wishlist/Container'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { color } from '@/constants/Colors'

export default function WishListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} style='auto'/>
      <Container />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f7f8f8",
    paddingHorizontal:20
  }
})