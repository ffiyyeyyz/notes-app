export function DeleteModal({ note, onConfirm, onCancel, loading }) {
  if (!note) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(61,43,31,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
        backdropFilter: 'blur(4px)',
        padding: '20px',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: '16px',
          padding: '36px',
          maxWidth: '380px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(61,43,31,0.3)',
          animation: 'fadeUp 0.25s ease',
          textAlign: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          width: '52px', height: '52px',
          background: 'rgba(184,66,66,0.1)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '22px',
        }}>
          🗑
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--brown)',
          marginBottom: '10px',
          fontStyle: 'italic',
        }}>
          Hapus Catatan?
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--brown-mid)',
          lineHeight: '1.6',
          marginBottom: '6px',
        }}>
          Catatan <strong>"{note.judul}"</strong> akan dihapus permanen.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--brown-light)', marginBottom: '28px' }}>
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: '10px 24px',
              background: 'var(--red)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              color: 'var(--brown-mid)',
              border: '1.5px solid var(--cream-dark)',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
