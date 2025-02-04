import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container } from '@/components/Scan/Container'

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Container />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})