import { Stack } from 'expo-router';
import { ItemProvider } from '../context/ItemContext';

export default function RootLayout() {
  return (
    <ItemProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ title: 'Item Details' }} />
      </Stack>
    </ItemProvider>
  );
}