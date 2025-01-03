import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          navigation.replace('Login');
          return;
        }

        // Récupérer les informations de l'utilisateur connecté
        const response = await axios.get('http://localhost:8000/api/user/register/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(response.data);

        // Récupérer la liste des autres utilisateurs
        const usersResponse = await axios.get('http://localhost:8000/api/users/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOtherUsers(usersResponse.data.filter(user => user.id !== response.data.id));
      } catch (error) {
        console.error('Auth error:', error);
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      {currentUser && (
        <View style={styles.userContainer}>
          <Text style={styles.title}>Bienvenue sur FitDiary</Text>
          <Text style={styles.currentUser}>
            {currentUser.first_name} {currentUser.last_name}
          </Text>
        </View>
      )}

      <View style={styles.otherUsersContainer}>
        <Text style={styles.subtitle}>Autres utilisateurs :</Text>
        {otherUsers.map(user => (
          <Text key={user.id} style={styles.otherUser}>
            {user.first_name} {user.last_name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentUser: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 40,
  },
  otherUsersContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  otherUser: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
});