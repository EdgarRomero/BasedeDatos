import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Cargar datos de AsyncStorage si existen (persistencia)
  useEffect(() => {
    const cargarDatosGuardados = async () => {
      try {
        const correoGuardado = await AsyncStorage.getItem('correo');
        if (correoGuardado) setCorreo(correoGuardado);
      } catch (error) {
        console.error('Error al cargar los datos guardados:', error);
      }
    };
    cargarDatosGuardados();
  }, []);

  // Función que maneja el inicio de sesión
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.132:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: correo, contraseña }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Inicio de sesión exitoso');

        // Guarda solo el correo en AsyncStorage para persistencia
        await AsyncStorage.setItem('correo', correo);

        // Navegar al dashboard principal
        navigation.navigate('Bancoapp');
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // UI del formulario de login
  return (
    <ImageBackground
      source={require('../assets/fondo5.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Fondo transparente para dar un look más moderno
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    color: '#333',
    fontFamily: 'Roboto',
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // Sombra para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});