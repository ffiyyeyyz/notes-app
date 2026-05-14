import { useState } from 'react';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function NoteCard({ note, onEdit, onDelete, index }) {
  const [hovered, setHovered] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);

  return (
    <article
      style={{
        background: hovered ? 'var(--white)' : 'var(--cream)',
        borderRadius: '12px',
        padding: '24px',
        border: `1.5px solid ${hovered ? 'rgba(200,131,42,0.3)' : 'rgba(61,43,31,0.08)'}`,
        cursor: 'default',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 28px var(--shadow)' : '0 1px 6px rgba(61,43,31,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        animation: `fadeUp 0.4s ease ${index * 0.05}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Amber accent line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, var(--amber), var(--amber-light))',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s ease',
        borderRadius: '12px 12px 0 0',
      }} />

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '17px',
        fontWeight: '700',
        color: 'var(--brown)',
        lineHeight: '1.3',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {note.judul}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--brown-mid)',
        lineHeight: '1.65',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1,
      }}>
        {note.isi}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '4px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(61,43,31,0.07)',
      }}>
        <time style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--brown-light)',
          letterSpacing: '0.02em',
        }}>
          {formatDate(note.tanggal_dibuat)}
        </time>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => onEdit(note)}
            style={{
              padding: '5px 13px',
              background: 'transparent',
              border: '1.5px solid var(--cream-dark)',
              borderRadius: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--brown-mid)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => { e.target.style.borderColor = 'var(--amber)'; e.target.style.color = 'var(--amber)'; }}
            onMouseOut={e => { e.target.style.borderColor = 'var(--cream-dark)'; e.target.style.color = 'var(--brown-mid)'; }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note)}
            style={{
              padding: '5px 13px',
              background: deleteHover ? 'var(--red)' : 'transparent',
              border: `1.5px solid ${deleteHover ? 'var(--red)' : 'var(--cream-dark)'}`,
              borderRadius: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: '500',
              color: deleteHover ? 'white' : 'var(--brown-mid)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={() => setDeleteHover(true)}
            onMouseLeave={() => setDeleteHover(false)}
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}
