import { query } from "../database/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const result = await query('SELECT * FROM admin_museum WHERE email = ?', [email]);

    if(result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token
    });
  }catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'terjadi kesalahan pada server' });
  }
}

export async function adminSignUp(req, res) {
  const {email, fullname, nomor_telepon, nama_museum, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO admin_museum (email, fullname, nomor_telepon, nama_museum, password) VALUES (?, ?, ?, ?, ?)', [email, fullname, nomor_telepon, nama_museum, hashedPassword])
    return res.status(201).json({
      message: 'User registered successfully!'
    });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'terjadi kesalahan pada server' });
  }
}