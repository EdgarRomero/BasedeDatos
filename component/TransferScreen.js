import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransferScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [senderId, setSenderId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
      } catch (error) {
        console.error('Error al obtener token:', error);
      }
    };
    getToken();
  }, []);

  const handleTransfer = async () => {
    if (!amount || !receiverId || !receiverName || !senderId) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
  
    try {
      const response = await fetch('(link unavailable)', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromUserId: senderId,
          toUserId: receiverId,
          amount: parseFloat(amount),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Guardar la transacción en la base de datos MySQL
        const transactionId = data.transactionId;
        const transactionDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const transactionAmount = parseFloat(amount);
        const senderName = 'Tu nombre'; // Reemplaza con el nombre del remitente
        const receiverName = receiverName; // Reemplaza con el nombre del destinatario
  
        const mysql = require('mysql');
        const db = mysql.createConnection({
          host: 'tu_host',
          user: 'tu_usuario',
          password: 'tu_contraseña',
          database: 'tu_base_de_datos',
        });
  
        db.connect((err) => {
          if (err) {
            console.error('Error al conectar con la base de datos:', err);
            return;
          }
  
          const query = `INSERT INTO transactions (id, sender_id, receiver_id, amount, date) VALUES (?, ?, ?, ?, ?)`;
          const values = [transactionId, senderId, receiverId, transactionAmount, transactionDate];
  
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Error al guardar la transacción:', err);
              return;
            }
  
            console.log('Transacción guardada con éxito.');
          });
        });
  
        Alert.alert('Éxito', `Transferencia realizada con éxito.`);
        setAmount('');
        setReceiverId('');
        setReceiverName('');
        setSenderId('');
      } else {
        Alert.alert('Error', data.message || 'No se pudo completar la transferencia.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error('Error al realizar transferencia:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transferencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ID del destinatario"
        value={receiverId}
        onChangeText={setReceiverId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del destinatario"
        value={receiverName}
        onChangeText={setReceiverName}
      />
      <TextInput
        style={styles.input}
        placeholder="ID del remitente"
        value={senderId}
        onChangeText={setSenderId}
        keyboardType="numeric"
      />
      <Button
        title="Realizar transferencia"
        onPress={handleTransfer}
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
});


export default TransferScreen;