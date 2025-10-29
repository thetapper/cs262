export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export const defaultItem: Item = {
    id: 0,
    name: 'Unknown',
    description: 'No description',
    price: 0
  };