// Import Package dan File
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");

// Inisialisasi Express
const app = express();

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(cors({
  origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware untuk parsing JSON
app.use(express.json());

// Sajikan file statis dari folder public (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Route dasar untuk testing
app.get("/api", (req, res) => {
  res.json({ message: "API Catatan berjalan!" });
});

// Setting Routes API
require("./schema/Catatan"); // Generate tabel catatan
app.use("/api/v1/catatan", catatanRoutes);

// Semua route selain /api diarahkan ke index.html (SPA support)
// Catatan: Express v5 tidak support "*" tanpa nama, gunakan "{*path}"
app.get("{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database tersinkron");
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Gagal tersambung ke database:", err.message);
});