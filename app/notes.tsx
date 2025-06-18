import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View, Pressable, Alert } from 'react-native';
import { getNotes, deleteNote, Note } from '../lib/notesStore';





export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Удалить?', 'Вы уверены?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        onPress: async () => {
          await deleteNote(id);
          loadNotes();
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }: { item: Note }) => (
    <Pressable
      onPress={() => router.push(`/note/view/${item.id}`)}
      onLongPress={() => handleDelete(item.id)}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
      }}
    >
      <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>{item.title || 'Без названия'}</Text>
      <Text style={{ color: '#aaa', marginTop: 4 }} numberOfLines={1}>
        {item.text}
      </Text>
      <Text style={{ color: '#555', marginTop: 4, fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 30, paddingBottom: 30, }}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Pressable
        onPress={() => router.push('/note/new')}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: '#1E5EFF',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
      </Pressable>
    </View>
  );
}

export const options = {
  headerShown: false,
};
