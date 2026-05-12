// ===== KONFIGURASI =====
const API_URL = "http://localhost:3000/api/v1/catatan";

// ===== STATE =====
let idHapus = null;

// ===== HELPER FUNCTIONS =====

function tampilAlert(pesan, tipe = "sukses") {
  const el = document.getElementById("alert");
  el.textContent = pesan;
  el.className = `alert ${tipe}`;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 3000);
}

function formatTanggal(tanggal) {
  const d = new Date(tanggal);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function setLoading(aktif) {
  const el = document.getElementById("loading");
  aktif ? el.classList.remove("hidden") : el.classList.add("hidden");
}

// ===== AMBIL SEMUA CATATAN =====
async function ambilCatatan() {
  setLoading(true);
  document.getElementById("daftar-catatan").innerHTML = "";
  document.getElementById("empty-state").classList.add("hidden");

  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    const catatan = json.data;

    document.getElementById("jumlah-catatan").textContent =
      catatan.length + " catatan";

    if (catatan.length === 0) {
      document.getElementById("empty-state").classList.remove("hidden");
    } else {
      renderCatatan(catatan);
    }
  } catch (err) {
    tampilAlert("Gagal memuat catatan. Pastikan server berjalan.", "error");
  } finally {
    setLoading(false);
  }
}

// ===== RENDER KARTU CATATAN =====
function renderCatatan(catatan) {
  const container = document.getElementById("daftar-catatan");
  container.innerHTML = "";

  catatan.forEach((item) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <div class="note-judul">${escapeHtml(item.judul)}</div>
      <div class="note-isi">${escapeHtml(item.isi)}</div>
      <div class="note-tanggal">${formatTanggal(item.tanggal_dibuat)}</div>
      <div class="note-actions">
        <button class="btn-edit" onclick="isiFormEdit(${item.id}, '${escapeJs(item.judul)}', '${escapeJs(item.isi)}')">Edit</button>
        <button class="btn-hapus" onclick="bukaModalHapus(${item.id})">Hapus</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== SIMPAN CATATAN (TAMBAH / EDIT) =====
async function simpanCatatan() {
  const id = document.getElementById("edit-id").value;
  const judul = document.getElementById("judul").value.trim();
  const isi = document.getElementById("isi").value.trim();

  if (!judul || !isi) {
    tampilAlert("Judul dan isi catatan tidak boleh kosong!", "error");
    return;
  }

  const btnSimpan = document.getElementById("btn-simpan");
  btnSimpan.disabled = true;
  btnSimpan.textContent = "Menyimpan...";

  try {
    let res;
    if (id) {
      // Mode edit
      res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi }),
      });
    } else {
      // Mode tambah
      res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi }),
      });
    }

    const json = await res.json();

    if (res.ok) {
      tampilAlert(json.message, "sukses");
      resetForm();
      ambilCatatan();
    } else {
      tampilAlert(json.message || "Terjadi kesalahan", "error");
    }
  } catch (err) {
    tampilAlert("Gagal terhubung ke server.", "error");
  } finally {
    btnSimpan.disabled = false;
    btnSimpan.textContent = "Simpan";
  }
}

// ===== ISI FORM UNTUK EDIT =====
function isiFormEdit(id, judul, isi) {
  document.getElementById("edit-id").value = id;
  document.getElementById("judul").value = judul;
  document.getElementById("isi").value = isi;
  document.getElementById("form-title").textContent = "Edit Catatan";
  document.getElementById("btn-batal").classList.remove("hidden");
  document.getElementById("btn-simpan").textContent = "Simpan Perubahan";

  // Scroll ke atas ke form
  document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
}

// ===== BATAL EDIT =====
function batalEdit() {
  resetForm();
}

function resetForm() {
  document.getElementById("edit-id").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("isi").value = "";
  document.getElementById("form-title").textContent = "Tambah Catatan Baru";
  document.getElementById("btn-batal").classList.add("hidden");
  document.getElementById("btn-simpan").textContent = "💾 Simpan";
}

// ===== MODAL HAPUS =====
function bukaModalHapus(id) {
  idHapus = id;
  document.getElementById("modal-hapus").classList.remove("hidden");
}

function tutupModal() {
  idHapus = null;
  document.getElementById("modal-hapus").classList.add("hidden");
}

async function konfirmasiHapus() {
  if (!idHapus) return;

  try {
    const res = await fetch(`${API_URL}/${idHapus}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      tampilAlert(json.message, "sukses");
      ambilCatatan();
    } else {
      tampilAlert(json.message || "Gagal menghapus catatan", "error");
    }
  } catch (err) {
    tampilAlert("Gagal terhubung ke server.", "error");
  } finally {
    tutupModal();
  }
}

// Tutup modal jika klik di luar
document.getElementById("modal-hapus").addEventListener("click", function (e) {
  if (e.target === this) tutupModal();
});

// ===== SECURITY HELPERS =====
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function escapeJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}

// ===== INIT =====
ambilCatatan();
