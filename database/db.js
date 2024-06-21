import mysql from 'mysql2/promise'
import 'dotenv/config'


const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

export async function testConnection() {
  try {
    await database.getConnection()
    console.log("Koneksi Berhasil")
  }catch(e) {
      console.log("Koneksi Gagal")
  }
}

export async function query(query, values) {
  try {
    const [result] = await database.query(query, values || []);
    return result;
  } catch (error) {
    console.error("Query failed:", error);
    throw error;
  }

}