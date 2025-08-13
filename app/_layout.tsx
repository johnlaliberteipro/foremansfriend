import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ShoppingListProvider } from '@/contexts/ShoppingListContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ShoppingListProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ShoppingListProvider>
  );
}
