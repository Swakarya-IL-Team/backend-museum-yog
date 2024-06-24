import { query } from "../database/db.js";

export async function addNewCollection(req, res) {
  const { nama_koleksi, deskripsi_koleksi } = req.body;
  const imageUrl = req.file ? `/gambar/gambarKoleksiMuseum/${req.file.filename}` : null;

  try {
    await query('INSERT INTO collections_museum (nama_koleksi, deskripsi_koleksi, imageUrl) VALUES (?, ?, ?)',
      [nama_koleksi, deskripsi_koleksi, imageUrl]);
    return res.status(200).json({
      message: 'Data koleksi berhasil ditambah'
    });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function getAllCollection(req, res) {
  try {
    const rows = await query('SELECT * FROM collections_museum');
    return res.status(200).json({
      message: 'Sukses',
      data: rows
    });
  } catch (error) {
    console.error('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function editCollection(req, res) {
  const { id } = req.params;
  const { nama_koleksi, deskripsi_koleksi } = req.body;
  let imageUrl = req.file ? `/gambar/gambarKoleksiMuseum/${req.file.filename}` : null;

  try {
    // Update query based on whether image is updated or not
    let updateQuery;
    let params;
    if (imageUrl) {
      updateQuery = 'UPDATE collections_museum SET nama_koleksi = ?, deskripsi_koleksi = ?, imageUrl = ? WHERE id = ?';
      params = [nama_koleksi, deskripsi_koleksi, imageUrl, id];
    } else {
      updateQuery = 'UPDATE collections_museum SET nama_koleksi = ?, deskripsi_koleksi = ? WHERE id = ?';
      params = [nama_koleksi, deskripsi_koleksi, id];
    }

    const result = await query(updateQuery, params);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Data koleksi berhasil diubah' });
    } else {
      return res.status(404).json({ message: 'Data koleksi tidak ditemukan' });
    }
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function deleteCollection(req, res) {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM collections_museum WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Data koleksi berhasil dihapus' });
    } else {
      return res.status(404).json({ message: 'Data koleksi tidak ditemukan' });
    }
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}