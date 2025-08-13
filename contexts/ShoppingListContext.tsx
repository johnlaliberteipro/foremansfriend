import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  supplier: string;
  price: number;
  unit: string;
  quantity: number;
}

interface ShoppingListContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, change: number) => void;
  removeItem: (id: string) => void;
  getTotalItems: () => number;
  getTotalCost: () => number;
  isItemAdded: (supplier: string, brand: string) => boolean;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}

export function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'QUIKRETE Concrete Mix',
      brand: 'QUIKRETE',
      supplier: 'Home Depot',
      price: 4.98,
      unit: '80 lb bag',
      quantity: 134,
    },
    {
      id: '2',
      name: 'Portland Cement',
      brand: 'QUIKRETE',
      supplier: 'Menards',
      price: 4.49,
      unit: '80 lb bag',
      quantity: 5,
    },
    {
      id: '3',
      name: 'Rebar #4',
      brand: 'Steel Dynamics',
      supplier: "Lowe's",
      price: 8.97,
      unit: '20 ft bar',
      quantity: 12,
    },
  ]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setCartItems(prevItems => {
      // Check if item already exists (same supplier and brand)
      const existingItemIndex = prevItems.findIndex(
        item => item.supplier === newItem.supplier && item.brand === newItem.brand
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        return [...prevItems, { ...newItem, id }];
      }
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeItem = (id: string) => {
    // Direct removal - Alert doesn't work reliably in web environment
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalCost = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const isItemAdded = (supplier: string, brand: string) => {
    return cartItems.some(item => item.supplier === supplier && item.brand === brand);
  };

  const value: ShoppingListContextType = {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalCost,
    isItemAdded,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}