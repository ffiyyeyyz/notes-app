import { useState, useEffect } from 'react';

const styles = {
  section: {
    background: 'var(--white)',
    borderRadius: '16px',
    padding: '36px 40px',
    boxShadow: '0 2px 20px var(--shadow)',
    animation: 'fadeUp 0.5s ease both',
    border: '1px solid rgba(61,43,31,0.08)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '28px',
  },
  titleLine: {
    width: '4px',
    height: '28px',
    background: 'linear-gradient(180deg, var(--amber), var(--amber-light))',
    borderRadius: '2px',
    flexShrink: 0,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--brown)',
    fontStyle: 'italic',
  },
  group: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--brown-mid)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid var(--cream-dark)',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--brown)',
    background: 'var(--cream)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid var(--cream-dark)',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--brown)',
    background: 'var(--cream)',
    outline: 'none',
    resize: 'vertical',
    minHeight: '120px',
    lineHeight: '1.6',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
  btnPrimary: {
    padding: '11px 24px',
    background: 'var(--brown)',
    color: 'var(--white)',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.15s',
    letterSpacing: '0.02em',
  },
  btnSecondary: {
    padding: '11px 20px',
    background: 'transparent',
    color: 'var(--brown-mid)',
    border: '1.5px solid var(--cream-dark)',
    borderRadius: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export function NoteForm({ editNote, onSave, onCancel, loading }) {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [focusJudul, setFocusJudul] = useState(false);
  const [focusIsi, setFocusIsi] = useState(false);

  useEffect(() => {
    if (editNote) {
      setJudul(editNote.judul);
      setIsi(editNote.isi);
    } else {
      setJudul('');
      setIsi('');
    }
  }, [editNote]);

  const handleSubmit = () => {
    if (!judul.trim() || !isi.trim()) return;
    onSave({ judul: judul.trim(), isi: isi.trim() });
  };

  const isEditing = Boolean(editNote);

  const focusStyle = {
    borderColor: 'var(--amber)',
    boxShadow: '0 0 0 3px rgba(200,131,42,0.12)',
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div style={styles.titleLine} />
        <h2 style={styles.title}>
          {isEditing ? 'Edit Catatan' : 'Catatan Baru'}
        </h2>
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Judul</label>
        <input
          style={{ ...styles.input, ...(focusJudul ? focusStyle : {}) }}
          type="text"
          value={judul}
          onChange={e => setJudul(e.target.value)}
          onFocus={() => setFocusJudul(true)}
          onBlur={() => setFocusJudul(false)}
          placeholder="Judul catatan..."
          disabled={loading}
        />
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Isi Catatan</label>
        <textarea
          style={{ ...styles.textarea, ...(focusIsi ? focusStyle : {}) }}
          value={isi}
          onChange={e => setIsi(e.target.value)}
          onFocus={() => setFocusIsi(true)}
          onBlur={() => setFocusIsi(false)}
          placeholder="Tulis catatan di sini..."
          disabled={loading}
          rows={5}
        />
      </div>

      <div style={styles.actions}>
        <button
          style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading || !judul.trim() || !isi.trim()}
          onMouseOver={e => !loading && (e.target.style.background = 'var(--brown-mid)')}
          onMouseOut={e => e.target.style.background = 'var(--brown)'}
        >
          {loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : '+ Simpan'}
        </button>
        {isEditing && (
          <button
            style={styles.btnSecondary}
            onClick={onCancel}
            disabled={loading}
            onMouseOver={e => e.target.style.borderColor = 'var(--brown-light)'}
            onMouseOut={e => e.target.style.borderColor = 'var(--cream-dark)'}
          >
            Batal
          </button>
        )}
      </div>
    </section>
  );
}
