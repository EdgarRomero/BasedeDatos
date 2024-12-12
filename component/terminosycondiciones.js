import React from 'react'; 
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const TérminosYCondiciones = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Términos y Condiciones</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.termsText}>
              Aquí van los términos y condiciones de tu aplicación.
              Puedes incluir todo el texto que consideres necesario. Ejemplo:
              {"\n\n"}
              1. Aceptación de los términos.
              {"\n"}
              2. Uso de la aplicación.
              {"\n"}
              3. Política de privacidad.
              {"\n"}
              4. Responsabilidad.
              {"\n"}
              5. Modificación de los términos.
              {"\n"}
              6. Terminación de la cuenta.
              {"\n"}
              7. Otros términos relevantes.
              {"\n\n"}
              Al continuar usando la aplicación, aceptas estos términos.
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo translúcido
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  termsText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TérminosYCondiciones;
