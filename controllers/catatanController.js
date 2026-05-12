const catatanModel = require("../models/catatanModels");

// GET semua catatan
const getAllCatatan = async (req, res) => {
  try {
    const semuaCatatan = await catatanModel.findAll();
    res.status(200).json({
      message: "Catatan berhasil diambil",
      data: semuaCatatan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil catatan",
      error: error.message,
    });
  }
};

// GET catatan berdasarkan ID
const getCatatanById = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        message: "Catatan tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Catatan berhasil diambil",
      data: catatan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil catatan",
      error: error.message,
    });
  }
};

// POST buat catatan baru
const createCatatan = async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({
      message: "Judul dan isi catatan wajib diisi",
    });
  }

  try {
    const catatanBaru = await catatanModel.create({
      judul,
      isi,
      tanggal_dibuat: new Date(),
    });
    res.status(201).json({
      message: "Catatan berhasil dibuat",
      data: catatanBaru,
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal membuat catatan",
      error: error.message,
    });
  }
};

// PUT update catatan
const updateCatatan = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({
      message: "Judul dan isi catatan wajib diisi",
    });
  }

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        message: "Catatan tidak ditemukan",
      });
    }

    await catatanModel.updateById(id, { judul, isi });

    const catatanDiupdate = await catatanModel.findById(id);
    res.status(200).json({
      message: "Catatan berhasil diupdate",
      data: catatanDiupdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate catatan",
      error: error.message,
    });
  }
};

// DELETE hapus catatan
const deleteCatatan = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        message: "Catatan tidak ditemukan",
      });
    }

    await catatanModel.deleteById(id);
    res.status(200).json({
      message: "Catatan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus catatan",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCatatan,
  getCatatanById,
  createCatatan,
  updateCatatan,
  deleteCatatan,
};
