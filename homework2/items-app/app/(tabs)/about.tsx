import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.description}>
          This is a product catalog application built with React Native and Expo Router.
        </Text>
        
        <Text style={styles.sectionTitle}>Features:</Text>
        <Text style={styles.listItem}>• Browse product items</Text>
        <Text style={styles.listItem}>• View detailed product information</Text>
        <Text style={styles.listItem}>• Delete items from the catalog</Text>
        <Text style={styles.listItem}>• Tab-based navigation</Text>
        
        <Text style={styles.sectionTitle}>Technologies Used:</Text>
        <Text style={styles.listItem}>• React Native</Text>
        <Text style={styles.listItem}>• Expo Router</Text>
        <Text style={styles.listItem}>• TypeScript</Text>
        <Text style={styles.listItem}>• Context API</Text>
        
        <Text style={styles.footer}>Homework 2 - CS 262</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 28,
    color: '#666',
    paddingLeft: 8,
  },
  footer: {
    fontSize: 14,
    color: '#999',
    marginTop: 32,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
