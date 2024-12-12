import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './component/menu';
import LoginScreen from './component/login'; 
import RegisterScreen from './component/register';
import BankAppScreen from './component/Bancoapp';
import TransferScreen from './TransferScreen'

// Crea el stack de navegación
const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Comprobar si ya hay un token guardado
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);  // Hay un token, el usuario está autenticado
        } else {
          setIsAuthenticated(false); // No hay token, el usuario no está autenticado
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false); // Si hay error, tratamos como no autenticado
      }
    };

    checkToken(); // Verificamos el token cuando se carga la aplicación
  }, []);

  if (isAuthenticated === null) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Bancopp" : "Menu"}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Bancoapp" component={BankAppScreen} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

