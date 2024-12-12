const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: '',  
  database: 'bancoapp',
});

const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  try {
    const saltRounds = 10; // Define el nivel de sal
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds); // Encripta la contraseña

    const query = 'INSERT INTO users (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, apellido, email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }

    const user = result[0];

    // Compara la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      console.log('Contraseña ingresada:', contraseña);
      console.log('Contraseña en BD:', user.contraseña);
      console.log('Coinciden:', isMatch);

      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  });
});

const QRCode = require('qrcode');

app.post('/generate-qr', async (req, res) => {
  const { amount, senderId, receiverId } = req.body;

  const transactionData = { amount, senderId, receiverId };
  const qrString = JSON.stringify(transactionData);

  try {
    const qrCode = await QRCode.toDataURL(qrString);
    res.status(200).json({ qrCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al generar el código QR' });
  }
});
app.post('/transactions', (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  const query = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';

  db.query(query, [senderId, receiverId, amount], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al registrar la transacción' });
    }
    res.status(200).json({ message: 'Transacción registrada exitosamente' });
  });
});

app.get('/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ?';

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener transacciones' });
    }
    res.status(200).json({ transactions: results });
  });
});

app.post('/transfer', async (req, res) => {
  const { sender_id, receiver_id, amount } = req.body;

  // Validar los parámetros
  if (!sender_id || !receiver_id || !amount) {
    return res.status(400).json({ message: 'Parámetros inválidos' });
  }

  // Verificar el saldo del remitente
  const senderBalance = await getBalance(sender_id);
  if (senderBalance < amount) {
    return res.status(400).json({ message: 'Saldo insuficiente' });
  }

  // Realizar la transacción
  try {
    await transferMoney(sender_id, receiver_id, amount);
    res.status(200).json({ message: 'Transacción realizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la transacción' });
  }
});

// Función para obtener el saldo de un usuario
async function getBalance(userId) {
  const query = 'SELECT user_balance FROM users WHERE id = ?';
  const result = await db.query(query, [userId]);
  return result[0].user_balance;
}

// Función para realizar una transacción
async function transferMoney(senderId, receiverId, amount) {
  // Actualizar el saldo del remitente
  const query1 = 'UPDATE users SET user_balance = user_balance - ? WHERE id = ?';
  await db.query(query1, [amount, senderId]);

  // Actualizar el saldo del destinatario
  const query2 = 'UPDATE users SET user_balance = user_balance + ? WHERE id = ?';
  await db.query(query2, [amount, receiverId]);

  // Crear una nueva entrada en la tabla de transacciones
  const query3 = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
  await db.query(query3, [senderId, receiverId, amount]);
}



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});