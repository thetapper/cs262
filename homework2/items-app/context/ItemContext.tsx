import React, { createContext, useState, useContext, useEffect } from 'react';
import { Item } from '../types';

type ItemContextType = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  deleteItem: (id: string) => void;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        // Fetch from local JSON file (Lab 6 requirement)
        const productsData = require('../assets/products.json');
        await new Promise(resolve => setTimeout(resolve, 500));
        setItems(productsData as Item[]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load items');
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const deleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <ItemContext.Provider value={{ items, isLoading, error, deleteItem }}>
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