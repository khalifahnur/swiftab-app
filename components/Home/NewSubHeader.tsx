import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type newSubHeaderTitleProps ={
    headerTitle:string;
    btnText?:string;
}

export default function NewSubHeader({headerTitle,btnText}:newSubHeaderTitleProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{headerTitle}</Text>
      <Pressable>
        <Text style={styles.btnTxt}>{btnText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        marginVertical:10,
    },
    title:{
        fontSize:15,
        fontWeight:'500',
    },
    btnTxt:{
        fontSize:14,
        fontWeight:'400',
        color:'red'
    },
})