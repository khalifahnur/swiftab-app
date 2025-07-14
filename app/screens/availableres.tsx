import { StyleSheet, View } from 'react-native'
import React from 'react'
import SearchPlaces from '@/components/Search/SearchPlaces/SearchPlaces'

export default function AvailableRes() {
  return (
    <View style={styles.container}>
      <SearchPlaces />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})