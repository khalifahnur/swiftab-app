import { color } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from './ProfileImage';


const Container = () => {
  return (
    <View style={styles.container}>
      {/* Profile Image and Name */}
      <View style={styles.profileContainer}>
        <ProfileImage />
      </View>

      <TouchableOpacity style={styles.premiumBanner}>
        <View style={styles.premiumIconContainer}>
          {/* <Icon name="crown-outline" size={24} color="#fff" /> */}
          <FontAwesome5 name="crown" size={24} color="#fff" />
        </View>
        <View style={styles.premiumTextContainer}>
          <Text style={styles.premiumTitle}>Get Premium Plan</Text>
          <Text style={styles.premiumSubtitle}>Lorem ipsum dolor sit amet</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.title} style={styles.menuItem} onPress={()=>router.push(item.url)}>
            <View style={styles.menuIconContainer}>
              <Icon name={item.icon} size={24} color="#6F7A8A" />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Icon name="chevron-forward-outline" size={24} color="#6F7A8A" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const menuItems = [
  { title: 'Account Details', icon: 'person-outline',url:'/screens/account' },
  { title: 'My Orders', icon: 'receipt-outline',url:'/screens/account' },
  { title: 'Settings', icon: 'settings-outline',url:'/screens/setting' },
  { title: 'Help Center', icon: 'help-circle-outline',url:'/screens/help' },
  { title: 'Language', icon: 'language-outline',url:'/screens/account' },
  { title: 'Invite Friends', icon: 'people-outline',url:'/screens/account' },
];

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.green,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  premiumIconContainer: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 25,
  },
  premiumTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  premiumTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  premiumSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#6F7A8A',
  },
});

export default Container;
