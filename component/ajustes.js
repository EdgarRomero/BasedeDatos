// Ajustes.js
import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Ajustes = ({ toggleTheme, isDarkMode }) => {
  const handleChangePassword = () => {
    Alert.alert('Cambio de contraseña', 'La funcionalidad de cambiar contraseña estará disponible pronto.');
  };

  const handleViewTerms = () => {
    const terms = [
      '\n1. Aceptación de los términos:\nAl usar nuestra aplicación, aceptas estos términos y condiciones. Si no estás de acuerdo, no debes usar la aplicación.',
      '2. Uso de la aplicación:\nLa aplicación debe ser utilizada únicamente para fines legales. No se permite su uso para actividades ilegales o prohibidas por la ley.',
      '3. Política de privacidad:\nTu privacidad es importante para nosotros. Nos comprometemos a proteger tu información personal y no la compartiremos con terceros sin tu consentimiento.',
      '4. Responsabilidad:\nNo nos hacemos responsables por daños, pérdidas o problemas ocasionados por el uso de la aplicación. El uso es bajo tu propio riesgo.',
      '5. Modificación de los términos:\nNos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será publicado en esta página.',
      '6. Terminación de la cuenta:\nPodemos suspender o cancelar tu cuenta si violas estos términos o si se considera necesario por razones operativas.',
      '7. Otros términos relevantes:\nExisten otros términos adicionales que pueden aplicarse según el servicio o la función que estés utilizando dentro de la aplicación.'
    ];
  
    Alert.alert(
      '\nTérminos y condiciones',
      terms.join('\n\n'),  // Unir todos los términos en un solo string, con saltos de línea entre cada uno
      [{ text: 'Aceptar' }]  // Solo un botón de "Aceptar"
    );
  };
  
  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Ajustes</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>Modo oscuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.settingButton} onPress={handleChangePassword}>
        <Text style={styles.settingButtonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingButton} onPress={handleViewTerms}>
        <Text style={styles.settingButtonText}>Ver términos y condiciones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 18,
  },
  settingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  settingButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});

export default Ajustes;