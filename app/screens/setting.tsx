import { StyleSheet, View } from 'react-native'
import React from 'react'
import Setting from '@/components/Settings/Setting/Setting'
import { color } from '@/constants/Colors'

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Setting />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:color.graywhite
    }
})