import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item } from '../types/items';

interface ItemContextType {
  items: Item[];
  deleteItem: (id: number) => void;
  loading: boolean;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Fallback data
const fallbackItems: Item[] = [
  {
    id: 1,
    name: "The Great Gatsby",
    description: "A classic American novel by F. Scott Fitzgerald",
    price: 12.99
  }
];

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(fallbackItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch from external URL
        const response = await fetch('https://reactnative.dev/movies.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Successfully loaded items from URL:', data);
        
        // Transform the movies data to match your Item interface
        const transformedItems: Item[] = data.movies.map((movie: any, index: number) => ({
          id: index + 1,
          name: movie.title,
          description: `Released: ${movie.releaseYear}`,
          price: 9.99 // Default price since movies.json doesn't have prices
        }));
        setItems(transformedItems);
      } catch (error) {
        console.error('Error loading items from URL, using fallback data:', error);
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const value = {
    items,
    deleteItem,
    loading
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItemContext() {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
}