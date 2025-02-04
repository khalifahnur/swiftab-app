import React from 'react';
import { 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import { color } from '@/constants/Colors';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
    {/* adaptive image */}
      <Image 
        source={require("../../assets/images/st/preview.png")} 
        style={styles.image} 
      />

      <Text style={styles.description}>
        Effortless dining reservations at your fingertips. 
        Discover, reserve, and enjoy your perfect meal.
      </Text>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.navigate("/(auth)/signin")}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => router.navigate("/(auth)/signup")}
      >
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: color.green,
    borderRadius: 8,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize:15,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#000',
    fontSize:15,
    fontWeight: '600',
  },
});
