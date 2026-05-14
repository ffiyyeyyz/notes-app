const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://be-rest-194342266835.us-central1.run.app";

const BASE_URL = `${API_BASE_URL}/api/v1/catatan`;

export const api = {
  async getAll() {
    const res = await fetch(BASE_URL);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Gagal memuat catatan");
    return json;
  },

  async create(data) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Gagal membuat catatan");
    return json;
  },

  async update(id, data) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Gagal memperbarui catatan");
    return json;
  },

  async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Gagal menghapus catatan");
    return json;
  },
};
