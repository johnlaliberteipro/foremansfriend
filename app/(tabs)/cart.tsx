import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingCart, Trash2, Plus, Minus, Download, Share } from 'lucide-react-native';
import { useShoppingList } from '@/contexts/ShoppingListContext';
import { Alert } from 'react-native';

export default function CartTab() {
  const { cartItems, updateQuantity, removeItem, getTotalItems, getTotalCost } = useShoppingList();
  
  const totalCost = getTotalCost();
  const totalItems = getTotalItems();

  const exportList = () => {
    Alert.alert(
      'Export Shopping List',
      'Choose export format:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'PDF', onPress: () => Alert.alert('Success', 'Shopping list exported as PDF') },
        { text: 'Email', onPress: () => Alert.alert('Success', 'Shopping list sent via email') },
      ]
    );
  };

  const shareList = () => {
    Alert.alert('Success', 'Shopping list shared successfully!');
  };

  const proceedToCheckout = () => {
    Alert.alert(
      'Proceed to Supplier',
      'You will be redirected to the supplier website to complete your purchase.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => Alert.alert('Redirecting', 'Opening supplier website...') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ShoppingCart size={32} color="#F97316" />
          <Text style={styles.title}>Shopping List</Text>
          <Text style={styles.subtitle}>{totalItems} items • ${totalCost.toFixed(2)} total</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <ShoppingCart size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>Your shopping list is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add materials from the calculator or suppliers to get started
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton} onPress={exportList}>
                <Download size={16} color="#3B82F6" />
                <Text style={styles.actionButtonText}>Export</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={shareList}>
                <Share size={16} color="#3B82F6" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cartItems}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                    <Text style={styles.itemSupplier}>From {item.supplier}</Text>
                    <Text style={styles.itemUnit}>{item.unit}</Text>
                  </View>

                  <View style={styles.itemControls}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} color="#6B7280" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} color="#6B7280" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>

                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
                <Text style={styles.summaryValue}>${totalCost.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Estimated Tax</Text>
                <Text style={styles.summaryValue}>${(totalCost * 0.08).toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>$79.00</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${(totalCost + totalCost * 0.08 + 79).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton} onPress={proceedToCheckout}>
                <Text style={styles.checkoutButtonText}>Proceed to Supplier</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cartItems: {
    gap: 16,
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemBrand: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  itemSupplier: {
    fontSize: 12,
    color: '#3B82F6',
    marginBottom: 2,
  },
  itemUnit: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemControls: {
    alignItems: 'flex-end',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    gap: 12,
    paddingHorizontal: 8,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 32,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  removeButton: {
    padding: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  checkoutButton: {
    backgroundColor: '#F97316',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});