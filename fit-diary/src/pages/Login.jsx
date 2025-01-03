import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Container from '../components/Container';
import { login } from '../services/api'; 

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      console.log('Attempting login with:', { email });
      const result = await login({ email, password });
      
      console.log('Login result:', result);
      
      if (result && result.success && result.userData) {
        // Store user data
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.userData));
        
        // Force navigation to Home
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'Home',
            params: { user: result.userData }
          }],
        });
      } else {
        setError('Login failed - invalid response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <Container>
    <LinearGradient
        // Background Linear Gradient
        colors={['#FBAB7E', '#F7CE68', '#ebb0f2']}
        style={styles.background}
      />
      <View style={styles.login}>
        <Image 
            source={require('../assets/rb_2981.png')} 
            style={[styles.image, styles.straw]} 
          />
          <Image 
            source={require('../assets/rb_115978.png')} 
            style={[styles.image, styles.broco]} 
          />
        <View style={styles.form}>
          <Image 
            source={require('../assets/logo_transparent.png')} 
            style={styles.logo} 
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, // Ajouter bottom: 0 pour étendre jusqu'en bas
  },
  logo: {
        width: 100,
        height: 110,
        borderRadius: 0,
        top: -25,
        alignSelf: 'center',
    },
    title: {
        alignSelf: 'center',
        top: -25,
    },
  image: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  straw: {
    width: 275,
    height: 275,
    position: 'absolute',
    top: -150, // Mettre à 0 pour coller en haut
    right: -90,
    transform: [{ rotate: '190deg' }],
    zIndex: 1, // Pour rester derrière le formulaire
  },
  broco: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: -150,
    left: -90,
    transform: [{ rotate: '130deg' }],
    zIndex: 1,
  },
  form: {
    width: '80%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(158, 94, 38, 0.7)',
    borderRadius: 20,
    marginVertical: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F29C23',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  }
});

export default Login