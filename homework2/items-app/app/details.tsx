import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useItemContext } from '../context/ItemContext';
import { defaultItem } from '../types/items';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { items, deleteItem } = useItemContext();
  const router = useRouter();

  // Find the selected item
  const selectedItem = items.find(item => item.id === Number(id)) || defaultItem;

  const handleDelete = () => {
    deleteItem(selectedItem.id);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{selectedItem.name}</Text>
      <Text style={styles.price}>${selectedItem.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedItem.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Delete Item" onPress={handleDelete} color="#FF3B30" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
});