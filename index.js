const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");

const app = express();

app.use(cors({
  origin: [
    "https://fiyya-fe-dot-e-40-489101.et.r.appspot.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API Catatan berjalan!" });
});

require("./schema/Catatan");
app.use("/api/v1/catatan", catatanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Backend berjalan di port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("Database berhasil terkoneksi");

    await sequelize.sync();
    console.log("Database tersinkron");
  } catch (err) {
    console.error("Gagal tersambung ke database:", err.message);
  }
});
