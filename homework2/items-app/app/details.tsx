import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useItemContext } from '../context/ItemContext';
import { Item } from '../types';

const defaultItem: Item = {
  id: '-1',
  title: 'Not Found',
  description: 'Product not found',
  price: 0,
  releaseYear: 'Unknown',
};

export default function DetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { items, deleteItem } = useItemContext();
  
  const selectedItem: Item = items.find(item => item.id === id) ?? defaultItem;

  const handleDelete = () => {
    deleteItem(selectedItem.id);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{selectedItem.title}</Text>
        <Text style={styles.price}>${selectedItem.price.toFixed(2)}</Text>
        <Text style={styles.year}>Released: {selectedItem.releaseYear}</Text>
        <Text style={styles.descriptionLabel}>Description:</Text>
        <Text style={styles.description}>{selectedItem.description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Delete Product" onPress={handleDelete} color="#dc3545" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  price: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
});