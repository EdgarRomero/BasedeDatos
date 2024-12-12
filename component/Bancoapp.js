import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ajustes from './ajustes';
import QRCode from 'react-native-qrcode-svg';

const BancoApp = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([
    { id: 1, date: '01/11/2024', description: 'Depósito inicial', amount: 1000, type: 'deposit' },
  ]);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    Alert.alert('Tema actualizado', `Modo oscuro ${!isDarkMode ? 'activado' : 'desactivado'}.`);
  };

  // Función para manejar el depósito
  const handleDeposit = () => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      Alert.alert('Error', 'Por favor ingrese un monto válido');
      return;
    }

    // Actualizamos el balance
    setBalance((prevBalance) => prevBalance + transactionAmount);

    // Agregar la transacción a la lista
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { id: prevTransactions.length + 1, date: new Date().toLocaleDateString(), description: 'Depósito', amount: transactionAmount, type: 'deposit' },
    ]);

    setAmount('');
  };

  // Función para manejar el retiro
  const handleWithdrawal = () => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      Alert.alert('Error', 'Por favor ingrese un monto válido');
      return;
    }

    // Verificar si el saldo es suficiente
    if (transactionAmount > balance) {
      Alert.alert('Error', 'Saldo insuficiente');
      return;
    }

    // Actualizamos el balance
    setBalance((prevBalance) => prevBalance - transactionAmount);

    // Agregar la transacción a la lista
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { id: prevTransactions.length + 1, date: new Date().toLocaleDateString(), description: 'Retiro', amount: transactionAmount, type: 'withdrawal' },
    ]);

    setAmount('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.homeContainer}>
            <Text style={[styles.balanceText, isDarkMode ? styles.darkText : styles.lightText]}>Saldo actual:</Text>
            <Text style={[styles.balanceAmount, isDarkMode ? styles.darkText : styles.lightText]}>
              ${balance.toFixed(2)}
            </Text>
            case 'home':
  return (
    <View style={styles.homeContainer}>
      {/* ... */}
      <View style={styles.buttonContainer}>
        {/* ... */}
        <TouchableOpacity style={[styles.button, { backgroundColor: '#4a90e2', shadowColor: '#4a90e2' }]} onPress={() => navigation.navigate('TransferScreen')}>
          <Text style={styles.buttonText}>Transferir</Text>
        </TouchableOpacity>
      </View>
      {/* ... */}
    </View>
  );



            {/* Cierra el teclado tocando fuera de él */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, isDarkMode ? { backgroundColor: '#333', color: '#fff', borderColor: '#555' } : { backgroundColor: '#fff', color: '#000' }]}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Monto"
                  placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                />
              </View>
            </TouchableWithoutFeedback>

            {/* Botones de depósito y retiro */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#28a745', shadowColor: '#28a745' }]}
                onPress={handleDeposit} // Usamos la función de depósito directamente
              >
                <Text style={styles.buttonText}>Depositar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#dc3545', shadowColor: '#dc3545' }]}
                onPress={handleWithdrawal} // Usamos la función de retiro directamente
              >
                <Text style={styles.buttonText}>Retirar</Text>
              </TouchableOpacity>
            </View>

            {/* Mostrar las transacciones */}
            {transactions.length === 0 ? (
              <Text style={[styles.noTransactionsText, isDarkMode ? styles.darkText : styles.lightText]}>
                No hay transacciones recientes.
              </Text>
            ) : (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.transactionItem}>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>{item.date}</Text>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>{item.description}</Text>
                    <Text style={{ color: item.type === 'deposit' ? '#28a745' : '#dc3545' }}>
                      {item.type === 'deposit' ? '+' : '-'}${item.amount.toFixed(2)}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        );
      case 'settings':
        return <Ajustes toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>BancoMex</Text>
        {renderContent()}

        {/* Código QR al final de la pantalla */}
        <View style={styles.qrContainer}>
          <QRCode value="https://www.bancoapp.com" size={150} />
        </View>

        {/* Barra de navegación al fondo */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setActiveTab('home')}>
            <Icon name="home-outline" size={30} color={activeTab === 'home' ? '#4a90e2' : '#6c757d'} />
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('settings')}>
            <Icon name="settings-outline" size={30} color={activeTab === 'settings' ? '#4a90e2' : '#6c757d'} />
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Estilos
const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: '#121212',
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '700',
    color: '#4a90e2',
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  balanceText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  noTransactionsText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  transactionItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 70,
  },
});

export default BancoApp;


