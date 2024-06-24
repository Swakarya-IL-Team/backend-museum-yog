import { query } from "../database/db.js";

export async function getMuseumDetails(req, res) {
  try {
    const rows = await query(`
      SELECT
        mi.id AS museum_id,
        mi.nama_museum,
        mi.deskripsi_museum,
        mi.alamat_museum,
        mi.gambar_thumbnail,
        mi.gambar1,
        mi.gambar2,
        mi.gambar3,
        GROUP_CONCAT(DISTINCT t.nama_transportasi) AS transportasi,
        GROUP_CONCAT(DISTINCT t.jarak_transportasi) AS jarak_transportasi,
        GROUP_CONCAT(DISTINCT t.tipe_transportasi) AS tipe_transportasi,
        GROUP_CONCAT(DISTINCT f.nama_fasilitas) AS fasilitas
      FROM
        museum_information mi
      LEFT JOIN
        museum_transportasi mt ON mi.id = mt.museum_id
      LEFT JOIN
        transportasi_museum t ON mt.transportasi_id = t.id
      LEFT JOIN
        museum_fasilitas mf ON mi.id = mf.museum_id
      LEFT JOIN
        fasilitas_museum f ON mf.fasilitas_id = f.id
      GROUP BY
        mi.id;
    `);

    const results = rows.map(row => ({
      id: row.museum_id,
      nama_museum: row.nama_museum,
      deskripsi_museum: row.deskripsi_museum,
      alamat_museum: row.alamat_museum,
      gambar_thumbnail: row.gambar_thumbnail,
      gambar1: row.gambar1,
      gambar2: row.gambar2,
      gambar3: row.gambar3,
      transportasi: row.transportasi ? row.transportasi.split(',') : [],
      jarak_transportasi: row.jarak_transportasi ? row.jarak_transportasi.split(',') : [],
      tipe_transportasi: row.tipe_transportasi ? row.tipe_transportasi.split(',') : [],
      fasilitas: row.fasilitas ? row.fasilitas.split(',') : []
    }));

    return res.status(200).json({
      message: 'Sukses',
      data: results
    });
  } catch (error) {
    console.error('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}
export async function addMuseumInformation(req, res) {
  const { nama_museum, deskripsi_museum, alamat_museum } = req.body;

  const gambar_thumbnail = req.files['gambar_thumbnail'] ? `/gambar/gambarMuseum/${req.files['gambar_thumbnail'][0].filename}` : null;
  const gambar1 = req.files['gambar1'] ? `/gambar/gambarMuseum/${req.files['gambar1'][0].filename}` : null;
  const gambar2 = req.files['gambar2'] ? `/gambar/gambarMuseum/${req.files['gambar2'][0].filename}` : null;
  const gambar3 = req.files['gambar3'] ? `/gambar/gambarMuseum/${req.files['gambar3'][0].filename}` : null;

  try {
    await query('INSERT INTO museum_information (nama_museum, deskripsi_museum, alamat_museum, gambar_thumbnail, gambar1, gambar2, gambar3) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama_museum, deskripsi_museum, alamat_museum, gambar_thumbnail, gambar1, gambar2, gambar3]);
    return res.status(200).json({
      message: 'Informasi museum berhasil ditambah'
    });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function editMuseumInformation(req, res) {
  const { id } = req.params;
  const { nama_museum, deskripsi_museum, alamat_museum } = req.body;

  let gambar_thumbnail = req.files['gambar_thumbnail'] ? `/gambar/gambarMuseum/${req.files['gambar_thumbnail'][0].filename}` : null;
  let gambar1 = req.files['gambar1'] ? `/gambar/gambarMuseum/${req.files['gambar1'][0].filename}` : null;
  let gambar2 = req.files['gambar2'] ? `/gambar/gambarMuseum/${req.files['gambar2'][0].filename}` : null;
  let gambar3 = req.files['gambar3'] ? `/gambar/gambarMuseum/${req.files['gambar3'][0].filename}` : null;

  try {
    const existingData = await query('SELECT * FROM museum_information WHERE id = ?', [id]);
    if (existingData.length === 0) {
      return res.status(404).json({ message: 'Data museum tidak ditemukan' });
    }

    // Jika tidak ada gambar baru yang diunggah, gunakan gambar yang ada
    gambar_thumbnail = gambar_thumbnail || existingData[0].gambar_thumbnail;
    gambar1 = gambar1 || existingData[0].gambar1;
    gambar2 = gambar2 || existingData[0].gambar2;
    gambar3 = gambar3 || existingData[0].gambar3;

    await query('UPDATE museum_information SET nama_museum = ?, deskripsi_museum = ?, alamat_museum = ?, gambar_thumbnail = ?, gambar1 = ?, gambar2 = ?, gambar3 = ? WHERE id = ?',
      [nama_museum, deskripsi_museum, alamat_museum, gambar_thumbnail, gambar1, gambar2, gambar3, id]);
    return res.status(200).json({
      message: 'Informasi museum berhasil diubah'
    });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function addTransportasi(req, res) {
  const { nama_transportasi, jarak_transportasi, tipe_transportasi } = req.body;

  try {
    await query('INSERT INTO transportasi_museum (nama_transportasi, jarak_transportasi, tipe_transportasi) VALUES (?, ?, ?)',
      [nama_transportasi, jarak_transportasi, tipe_transportasi]);
    return res.status(200).json({ message: 'Data transportasi berhasil ditambah' });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function editTransportasi(req, res) {
  const { id } = req.params;
  const { nama_transportasi, jarak_transportasi, tipe_transportasi } = req.body;

  try {
    const existingData = await query('SELECT * FROM transportasi_museum WHERE id = ?', [id]);
    if (existingData.length === 0) {
      return res.status(404).json({ message: 'Data transportasi tidak ditemukan' });
    }

    await query('UPDATE transportasi_museum SET nama_transportasi = ?, jarak_transportasi = ?, tipe_transportasi = ? WHERE id = ?',
      [nama_transportasi, jarak_transportasi, tipe_transportasi, id]);
    return res.status(200).json({ message: 'Data transportasi berhasil diubah' });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function addFasilitas(req, res) {
  const { nama_fasilitas } = req.body;

  try {
    await query('INSERT INTO fasilitas_museum (nama_fasilitas) VALUES (?)', [nama_fasilitas]);
    return res.status(200).json({ message: 'Data fasilitas berhasil ditambah' });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}

export async function editFasilitas(req, res) {
  const { id } = req.params;
  const { nama_fasilitas } = req.body;

  try {
    const existingData = await query('SELECT * FROM fasilitas_museum WHERE id = ?', [id]);
    if (existingData.length === 0) {
      return res.status(404).json({ message: 'Data fasilitas tidak ditemukan' });
    }

    await query('UPDATE fasilitas_museum SET nama_fasilitas = ? WHERE id = ?', [nama_fasilitas, id]);
    return res.status(200).json({ message: 'Data fasilitas berhasil diubah' });
  } catch (error) {
    console.log('Terjadi kesalahan', error);
    return res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
}