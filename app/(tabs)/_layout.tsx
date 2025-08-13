import { Tabs } from 'expo-router';
import { Calculator, ShoppingCart, Store, User } from 'lucide-react-native';
import { useShoppingList } from '@/contexts/ShoppingListContext';
import { Text, View } from 'react-native';

export default function TabLayout() {
  const { cartItems } = useShoppingList();
  const itemCount = cartItems.length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ size, color }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="suppliers"
        options={{
          title: 'Suppliers',
          tabBarIcon: ({ size, color }) => (
            <Store size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: itemCount > 0 ? `Shopping List (${itemCount})` : 'Shopping List',
          tabBarIcon: ({ size, color }) => (
            <View style={{ position: 'relative' }}>
              <ShoppingCart size={size} color={color} />
              {itemCount > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  backgroundColor: '#F97316',
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}