import { query } from "../database/db.js";

export async function addNewTicketIndividual(req, res) {
  const {nama_tiket, deskripsi_tiket, harga_weekdays, harga_weekend} = req.body
  try {
    await query('INSERT INTO individual_ticket_museum(nama_tiket, deskripsi_tiket, harga_weekdays, harga_weekend) VALUES(?, ?, ?, ?)', [nama_tiket, deskripsi_tiket, harga_weekdays, harga_weekend])
    return res.status(200).json({
      message: "Data tiket berhasil ditambah"
    })
  }catch(error) {
    console.log("Terjadi kesalahan", error)
    return res.status(500).json({msg:"terjadi kesalahan pada server"})
  }
}

export async function getAllInvidualTicket(req, res) {
  try {
    const result = await query("SELECT * FROM individual_ticket_museum")
    return res.status(200).json({
      message: "Sukses",
      data: result
    })
  } catch (error) {
    console.log("Terjadi kesalahan", error)
    return res.status(500).json({msg:"terjadi kesalahan pada server"})
  }
}

export async function editIndividualTicket(req, res) {
  const {id} = req.params
  const{nama_tiket, deskripsi_tiket, harga_weekdays, harga_weekend} = req.body
  try {
    const result = await query('UPDATE individual_ticket_museum SET nama_tiket = ?, deskripsi_tiket = ?, harga_weekdays = ?, harga_weekend = ? WHERE id = ?', [nama_tiket, deskripsi_tiket, harga_weekdays, harga_weekend, id]);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Berhasil mengupdate tiket individual" })
    } else {
      return res.status(404).json({ msg: "Tiket Individual Tidak Di Temukan" })
    }
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}

export async function deleteIndividualTicket(req, res) {
  const {id} = req.params
  try {
    const tiket = await query('DELETE FROM individual_ticket_museum WHERE id = ?', [id]);
    if (tiket.length > 0) {
      return res.status(200).json({message: "Tiket Individual Berhasil di Hapus"});
    } else {
      return res.status(404).json({ msg: "Tiket Individual Tidak Di Temukan" });
    }
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}

export async function addNewTicketPacket(req, res) {
  const {nama_tiket, deskripsi_tiket, harga_tiket} = req.body
  try {
    await query('INSERT INTO packet_ticket_museum(nama_tiket, deskripsi_tiket, harga_tiket) VALUES(?, ?, ?)', [nama_tiket, deskripsi_tiket, harga_tiket])
    return res.status(200).json({
      message: "Data tiket berhasil ditambah"
    })
  }catch(error) {
    console.log("Terjadi kesalahan", error)
    return res.status(500).json({msg:"terjadi kesalahan pada server"})
  }
}

export async function getAllPaketTiket(req,res) {
  try {
    const result = await query("SELECT * FROM packet_ticket_museum")
    return res.status(200).json({
      message: "Sukses",
      data: result
    })
  } catch (error) {
    console.log("Terjadi kesalahan", error)
    return res.status(500).json({msg:"terjadi kesalahan pada server"})
  }
}

export async function editPacketTiket(req, res) {
  const {id} = req.params
  const{nama_tiket, deskripsi_tiket, harga_tiket} = req.body
  try {
    const result = await query('UPDATE packet_ticket_museum SET nama_tiket = ?, deskripsi_tiket = ?, harga_tiket = ? WHERE id = ?', [nama_tiket, deskripsi_tiket, harga_tiket, id]);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Berhasil mengupdate tiket individual" })
    } else {
      return res.status(404).json({ msg: "Tiket Paket Tidak Di Temukan" })
    }
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}


export async function deletePacketTiket(req, res) {
  const {id} = req.params
  try {
    const tiket = await query('DELETE FROM packet_ticket_museum WHERE id = ?', [id]);
    if (tiket.length > 0) {
      return res.status(200).json({message: "Tiket Paket Berhasil di Hapus"});
    } else {
      return res.status(404).json({ msg: "Tiket Paket Tidak Di Temukan" });
    }
  } catch (error) {
    console.error("Terjadi kesalahan", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
}
