import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <View style={styles.menuContainer}>
      {/* Imagen arriba del nombre de la app */}
      <Image
        source={require('../assets/logo.png')} // Ruta de la imagen del logo
        style={styles.logo}
      />

      <Text style={styles.title}>BANMEX</Text>

      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.menuText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.menuText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e78ac',  // Color de fondo actualizado
    padding: 20,
  },
  logo: {
    width: 120,  // Ajusta el tamaño de la imagen según tus necesidades
    height: 120, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 20, // Espacio entre la imagen y el nombre
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
