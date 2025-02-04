import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '@/constants/Colors'

export default function Promotions() {
  return (
    <>
    <View style={{marginVertical:20, }}>
        <View style={styles.imageHeader}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center",justifyContent:'space-between' }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: color.gray,
                }}
              >
                Get special offer 
              </Text>
              <View style={{flexDirection:'row',gap:10}}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color: color.gray,
                }}
              >
                up to 
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: color.black,
                }}
              >
                30%
              </Text>

              </View>
              
              <TouchableOpacity style={{backgroundColor:color.gray,padding:10,borderRadius:12}}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: color.black,
                }}
              >
                Book Now
              </Text>
              </TouchableOpacity>
              
            </View>
            <View style={{ width: 80, height: 80, alignItems: "center",flexDirection:'row',gap:10 }}>
                <View style={styles.line} />
              <Image
                source={require("../../assets/images/restaurants/ad.jpeg")}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
    
  )
}

const styles = StyleSheet.create({
    imageHeader: {
        paddingVertical:10,
        backgroundColor:color.green,
        borderRadius: 15,
        borderWidth: 2,
        borderColor:color.green,
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
      },
      line:{
        height: 50,
        borderWidth: 2,
        borderColor: color.gray,
        borderRadius: 50, 
      },
})