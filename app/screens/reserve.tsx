import { StyleSheet } from 'react-native'
import React from 'react'
import Container from '@/components/Reserve/ReserveScreen/Container'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ReserveScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Container />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f8f8'
    }
})