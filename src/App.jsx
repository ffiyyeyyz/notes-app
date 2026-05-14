import { useEffect, useState, useCallback } from 'react';
import { useNotes } from './hooks/useNotes';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { DeleteModal } from './components/DeleteModal';
import { Toast } from './components/Toast';

export default function App() {
  const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
  const [editNote, setEditNote] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editNote) {
        await updateNote(editNote.id, data);
        showToast('Catatan berhasil diperbarui');
        setEditNote(null);
      } else {
        await createNote(data);
        showToast('Catatan berhasil dibuat');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteNote(deleteTarget.id);
      showToast('Catatan berhasil dihapus');
      setDeleteTarget(null);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'var(--brown)',
        padding: '0 40px',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 20px rgba(61,43,31,0.25)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, var(--amber), var(--amber-light))',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>
              📓
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: '700',
              color: 'var(--cream)',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}>
              Catatan
            </span>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '5px 14px',
            borderRadius: '20px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--cream-dark)',
          }}>
            {notes.length} catatan
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '32px',
        alignItems: 'start',
      }}>
        {/* Left: Form */}
        <aside style={{ position: 'sticky', top: '88px' }}>
          <NoteForm
            editNote={editNote}
            onSave={handleSave}
            onCancel={() => setEditNote(null)}
            loading={saving}
          />
        </aside>

        {/* Right: Notes List */}
        <section>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '24px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              fontWeight: '700',
              color: 'var(--brown)',
              fontStyle: 'italic',
            }}>
              Semua Catatan
            </h2>
            {!loading && (
              <span style={{
                background: 'var(--amber)',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 10px',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
              }}>
                {notes.length}
              </span>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div style={{
              background: 'rgba(184,66,66,0.08)',
              border: '1.5px solid rgba(184,66,66,0.2)',
              borderRadius: '10px',
              padding: '16px 20px',
              color: 'var(--red)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              marginBottom: '20px',
            }}>
              {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  height: '160px',
                  background: 'var(--cream-dark)',
                  borderRadius: '12px',
                  animation: 'pulse 1.5s ease infinite',
                }} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && notes.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--brown-light)',
              animation: 'fadeIn 0.4s ease',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--brown-mid)',
                marginBottom: '8px',
              }}>
                Belum ada catatan
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                Buat catatan pertamamu menggunakan form di sebelah kiri.
              </p>
            </div>
          )}

          {/* Notes grid */}
          {!loading && notes.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {notes.map((note, i) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  index={i}
                  onEdit={note => setEditNote(note)}
                  onDelete={note => setDeleteTarget(note)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Delete modal */}
      <DeleteModal
        note={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      {/* Toast */}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
