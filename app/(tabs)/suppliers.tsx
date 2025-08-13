import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Store, MapPin, Star, TrendingUp } from 'lucide-react-native';

interface Supplier {
  id: string;
  name: string;
  logo: string;
  rating: number;
  distance: string;
  deliveryFee: number;
  materials: Material[];
}

interface Material {
  id: string;
  name: string;
  price: number;
  unit: string;
  inStock: boolean;
  brand: string;
}

export default function SuppliersTab() {
  const [selectedCategory, setSelectedCategory] = useState('concrete');

  const suppliers: Supplier[] = [
    {
      id: 'home-depot',
      name: 'Home Depot',
      logo: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 4.3,
      distance: '2.1 mi',
      deliveryFee: 79,
      materials: [
        { id: '1', name: 'QUIKRETE Concrete Mix', price: 4.98, unit: '80 lb bag', inStock: true, brand: 'QUIKRETE' },
        { id: '2', name: 'Sakrete Fast Setting Concrete', price: 5.47, unit: '80 lb bag', inStock: true, brand: 'Sakrete' },
        { id: '3', name: 'QUIKRETE High Strength Concrete', price: 6.28, unit: '80 lb bag', inStock: false, brand: 'QUIKRETE' },
      ],
    },
    {
      id: 'menards',
      name: 'Menards',
      logo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 4.1,
      distance: '3.7 mi',
      deliveryFee: 59,
      materials: [
        { id: '4', name: 'Mastercraft Concrete Mix', price: 4.49, unit: '80 lb bag', inStock: true, brand: 'Mastercraft' },
        { id: '5', name: 'QUIKRETE Concrete Mix', price: 4.89, unit: '80 lb bag', inStock: true, brand: 'QUIKRETE' },
        { id: '6', name: 'Rapid Set Concrete', price: 7.99, unit: '80 lb bag', inStock: true, brand: 'Rapid Set' },
      ],
    },
    {
      id: 'lowes',
      name: "Lowe's",
      logo: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 4.2,
      distance: '4.2 mi',
      deliveryFee: 69,
      materials: [
        { id: '7', name: 'QUIKRETE Concrete Mix', price: 5.12, unit: '80 lb bag', inStock: true, brand: 'QUIKRETE' },
        { id: '8', name: 'Sakrete Concrete Mix', price: 4.78, unit: '80 lb bag', inStock: true, brand: 'Sakrete' },
        { id: '9', name: 'Red Devil Concrete Patch', price: 12.99, unit: '25 lb bag', inStock: true, brand: 'Red Devil' },
      ],
    },
  ];

  const categories = [
    { id: 'concrete', name: 'Concrete' },
    { id: 'lumber', name: 'Lumber' },
    { id: 'hardware', name: 'Hardware' },
    { id: 'tools', name: 'Tools' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Store size={32} color="#F97316" />
          <Text style={styles.title}>Suppliers</Text>
          <Text style={styles.subtitle}>Compare prices from local suppliers</Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.id && styles.categoryButtonTextActive
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.suppliersSection}>
          <Text style={styles.sectionTitle}>Available Suppliers</Text>
          
          {suppliers.map((supplier) => (
            <View key={supplier.id} style={styles.supplierCard}>
              <View style={styles.supplierHeader}>
                <Image source={{ uri: supplier.logo }} style={styles.supplierLogo} />
                <View style={styles.supplierInfo}>
                  <Text style={styles.supplierName}>{supplier.name}</Text>
                  <View style={styles.supplierMeta}>
                    <View style={styles.ratingContainer}>
                      <Star size={16} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.rating}>{supplier.rating}</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                      <MapPin size={16} color="#6B7280" />
                      <Text style={styles.distance}>{supplier.distance}</Text>
                    </View>
                    <Text style={styles.deliveryFee}>Delivery: ${supplier.deliveryFee}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.materialsContainer}>
                <Text style={styles.materialsTitle}>Available Materials</Text>
                {supplier.materials.slice(0, 2).map((material) => (
                  <View key={material.id} style={styles.materialItem}>
                    <View style={styles.materialInfo}>
                      <Text style={styles.materialName}>{material.name}</Text>
                      <Text style={styles.materialBrand}>{material.brand}</Text>
                      <Text style={styles.materialUnit}>{material.unit}</Text>
                    </View>
                    <View style={styles.materialPricing}>
                      <Text style={styles.materialPrice}>${material.price}</Text>
                      <View style={[
                        styles.stockBadge,
                        material.inStock ? styles.inStock : styles.outOfStock
                      ]}>
                        <Text style={[
                          styles.stockText,
                          material.inStock ? styles.inStockText : styles.outOfStockText
                        ]}>
                          {material.inStock ? 'In Stock' : 'Out of Stock'}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
                
                <TouchableOpacity style={styles.viewAllButton}>
                  <TrendingUp size={16} color="#3B82F6" />
                  <Text style={styles.viewAllText}>View All Materials & Prices</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  categoriesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  suppliersSection: {
    gap: 20,
  },
  supplierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  supplierLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  supplierMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
  },
  deliveryFee: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  materialsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  materialsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  materialInfo: {
    flex: 1,
  },
  materialName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  materialBrand: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  materialUnit: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  materialPricing: {
    alignItems: 'flex-end',
  },
  materialPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 4,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  inStock: {
    backgroundColor: '#D1FAE5',
  },
  outOfStock: {
    backgroundColor: '#FEE2E2',
  },
  stockText: {
    fontSize: 10,
    fontWeight: '500',
  },
  inStockText: {
    color: '#065F46',
  },
  outOfStockText: {
    color: '#991B1B',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    gap: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});