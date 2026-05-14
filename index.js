const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3001",
    "http://127.0.0.1:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API Catatan berjalan!" });
});

require("./schema/Catatan");
app.use("/api/v1/catatan", catatanRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database tersinkron");
  app.listen(PORT, () => {
    console.log(`Backend berjalan di http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Gagal tersambung ke database:", err.message);
});
