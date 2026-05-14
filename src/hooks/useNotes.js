import { useState, useCallback } from 'react';
import { api } from '../api/notes';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await api.getAll();
      setNotes(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (data) => {
    const json = await api.create(data);
    await fetchNotes();
    return json;
  }, [fetchNotes]);

  const updateNote = useCallback(async (id, data) => {
    const json = await api.update(id, data);
    await fetchNotes();
    return json;
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id) => {
    const json = await api.delete(id);
    await fetchNotes();
    return json;
  }, [fetchNotes]);

  return { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote };
}
