import { query } from "../database/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function userLogin(req, res) {
  const { username, password } = req.body;

  try {
    const result = await query('SELECT * FROM user_museum WHERE username = ?', [username]);

    if(result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token
    });
  }catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'terjadi kesalahan pada server' });
  }
}

export async function userSignUp(req, res) {
  const { fullname, username, password, jenis_kelamin, nomor_telepon } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO user_museum (fullname, username, password, jenis_kelamin, nomor_telepon) VALUES (?, ?, ?, ?, ?)', [fullname, username, hashedPassword, jenis_kelamin, nomor_telepon]);
    return res.status(201).json({
      message: 'User registered successfully!'
    });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'terjadi kesalahan pada server' });
  }
}