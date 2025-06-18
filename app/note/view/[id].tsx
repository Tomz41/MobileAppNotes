import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { getNotes, deleteNote, Note } from '../../../lib/notesStore';

export default function NoteView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      loadNote(id);
    }
  }, [id]);

  const loadNote = async (noteId: string) => {
    const notes = await getNotes();
    const found = notes.find((n) => n.id === noteId);
    if (found) setNote(found);
  };

  const handleDelete = () => {
    Alert.alert('Удалить запись?', 'Вы уверены?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          if (typeof id === 'string') {
            await deleteNote(id);
            router.replace('/notes');
          }
        },
      },
    ]);
  };

  if (!note) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', padding: 20, paddingTop: 40, paddingBottom: 40,display:'flex',justifyContent:'space-between' }}>
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>{note.title || 'Без названия'}</Text>
        <Text style={{ fontSize: 14, color: '#777', marginVertical: 10 }}>
          {new Date(note.createdAt).toLocaleString()}
        </Text>
        <Text style={{ fontSize: 16, color: '#fff' }}>{note.text}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
        <Pressable onPress={() => router.replace('/note/' + id)}>
          <Text style={{ color: '#1E5EFF', fontSize: 16 }}>Редактировать</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text style={{ color: 'red', fontSize: 16 }}>Удалить</Text>
        </Pressable>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: '#999', fontSize: 16 }}>Назад</Text>
        </Pressable>
      </View>
    </View>
  );
}
