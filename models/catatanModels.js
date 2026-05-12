const Catatan = require("../schema/Catatan");

const findAll = async () => {
  return await Catatan.findAll({
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
    order: [["tanggal_dibuat", "DESC"]],
  });
};

const create = async (data) => {
  return await Catatan.create(data);
};

const findById = async (id) => {
  return await Catatan.findByPk(id, {
    attributes: ["id", "judul", "isi", "tanggal_dibuat"],
  });
};

const updateById = async (id, data) => {
  return await Catatan.update(data, {
    where: { id: id },
  });
};

const deleteById = async (id) => {
  return await Catatan.destroy({
    where: { id: id },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
