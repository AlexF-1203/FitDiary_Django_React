import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function Home({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          navigation.replace('Login');
          return;
        }
        const response = await api.get('/user/');
        setUser(response.data);
      } catch (error) {
        console.error('Error:', error);
        navigation.replace('Login');
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Bienvenue sur FitDiary</Text>
      {user && (
        <Text style={styles.subtitle}>
          {user.first_name} {user.last_name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#007AFF',
  },

  header: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#F29C23',
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});