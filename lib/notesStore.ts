import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  title?: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'notes';

export async function getNotes(): Promise<Note[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export async function addNote(note: Note) {
  const notes = await getNotes();
  await saveNotes([note, ...notes]);
}

export async function deleteNote(id: string) {
  const notes = await getNotes();
  await saveNotes(notes.filter((n) => n.id !== id));
}
