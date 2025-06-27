import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, TextInput, Text, Pressable, Alert } from 'react-native';
import { getNotes, saveNotes, deleteNote, Note } from '../../lib/notesStore';
import uuid from 'react-native-uuid';


export default function NoteEditor() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id !== 'new') {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    const notes = await getNotes();
    const note = notes.find((n) => n.id === id);
    if (note) {
      setIsEditing(true);
      setTitle(note.title || '');
      setText(note.text);
    }
  };

const handleSave = async () => {
  console.log('→ handleSave');
   if (!text.trim()) {
     Alert.alert('Ошибка', 'Поле текста не может быть пустым');
     return;
   }
  try {
    const newNote: Note = {
      id: typeof id === 'string' && id !== 'new' ? id : uuid.v4() as string,
      title,
      text,
      createdAt: new Date().toISOString(),
    };

    console.log('Сохранили:', newNote);

    const notes = await getNotes();
    const updated = notes.filter((n) => n.id !== newNote.id);
    await saveNotes([newNote, ...updated]);

    router.replace('/notes');
  } catch (err) {
    console.log('Ошибка при сохранении:', err);
    Alert.alert('Ошибка', 'Не удалось сохранить запись');
  }
};



  const handleDelete = async () => {
    Alert.alert('Удалить?', 'Вы уверены?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        onPress: async () => {
          if (typeof id === 'string') {
            await deleteNote(id);
          }
          router.replace('/notes');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 35  }}>
      <TextInput
        placeholder="Заголовок (необязательно)"
        placeholderTextColor="#555"
        style={{ fontSize: 18, color: '#fff', marginBottom: 12 }}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Текст заметки"
        placeholderTextColor="#777"
        style={{ fontSize: 16, color: '#fff', flex: 1, textAlignVertical: 'top' }}
        multiline
        value={text}
        onChangeText={setText}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        {isEditing && (
          <Pressable onPress={handleDelete}>
            <Text style={{ color: 'red', fontSize: 16 }}>Удалить</Text>
          </Pressable>
        )}
        <Pressable onPress={handleSave}>
          <Text style={{ color: '#1E5EFF', fontSize: 16 }}>Сохранить</Text>
        </Pressable>
      </View>
    </View>
  );
}
