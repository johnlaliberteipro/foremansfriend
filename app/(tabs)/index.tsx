import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, Plus, Info, TrendingUp } from 'lucide-react-native';
import { useShoppingList } from '@/contexts/ShoppingListContext';

interface CalculationResult {
  volume: number;
  material: string;
  bags: number;
  estimatedCost: number;
  unit: string;
  coverage: number;
  supplierOptions: SupplierOption[];
}

interface SupplierOption {
  supplier: string;
  brand: string;
  bagSize: string;
  price: number;
  bags: number;
  totalCost: number;
  inStock: boolean;
  deliveryFee: number;
}

export default function CalculatorTab() {
  const [length, setLength] = useState('40');
  const [width, setWidth] = useState('20');
  const [depth, setDepth] = useState('2');
  const [materialType, setMaterialType] = useState('concrete');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const { addItem, isItemAdded } = useShoppingList();

  const materialTypes = [
    { 
      id: 'concrete', 
      name: 'Concrete', 
      description: 'Ready-mix concrete for foundations, slabs',
      coverage: 0.6, // cubic feet per 80lb bag
      suppliers: [
        { supplier: 'Home Depot', brand: 'QUIKRETE', bagSize: '80 lb', price: 4.98, deliveryFee: 79, inStock: true },
        { supplier: 'Home Depot', brand: 'Sakrete Fast Setting', bagSize: '80 lb', price: 5.47, deliveryFee: 79, inStock: true },
        { supplier: 'Menards', brand: 'Mastercraft', bagSize: '80 lb', price: 4.49, deliveryFee: 59, inStock: true },
        { supplier: 'Menards', brand: 'QUIKRETE', bagSize: '80 lb', price: 4.89, deliveryFee: 59, inStock: true },
        { supplier: "Lowe's", brand: 'QUIKRETE', bagSize: '80 lb', price: 5.12, deliveryFee: 69, inStock: true },
        { supplier: "Lowe's", brand: 'Sakrete', bagSize: '80 lb', price: 4.78, deliveryFee: 69, inStock: false },
      ]
    },
    { 
      id: 'sand', 
      name: 'Sand', 
      description: 'Play sand, masonry sand, leveling sand',
      coverage: 0.5, // cubic feet per 50lb bag
      suppliers: [
        { supplier: 'Home Depot', brand: 'QUIKRETE Play Sand', bagSize: '50 lb', price: 3.48, deliveryFee: 79, inStock: true },
        { supplier: 'Menards', brand: 'Mastercraft Sand', bagSize: '50 lb', price: 2.99, deliveryFee: 59, inStock: true },
        { supplier: "Lowe's", brand: 'QUIKRETE All-Purpose Sand', bagSize: '50 lb', price: 3.67, deliveryFee: 69, inStock: true },
      ]
    },
    { 
      id: 'gravel', 
      name: 'Gravel', 
      description: 'Pea gravel, crushed stone, drainage gravel',
      coverage: 0.5, // cubic feet per 50lb bag
      suppliers: [
        { supplier: 'Home Depot', brand: 'QUIKRETE Pea Gravel', bagSize: '50 lb', price: 4.28, deliveryFee: 79, inStock: true },
        { supplier: 'Menards', brand: 'Mastercraft Gravel', bagSize: '50 lb', price: 3.89, deliveryFee: 59, inStock: true },
        { supplier: "Lowe's", brand: 'QUIKRETE Crushed Stone', bagSize: '50 lb', price: 4.45, deliveryFee: 69, inStock: true },
      ]
    },
    { 
      id: 'mulch', 
      name: 'Mulch', 
      description: 'Bark mulch, wood chips, rubber mulch',
      coverage: 2, // cubic feet per bag
      suppliers: [
        { supplier: 'Home Depot', brand: 'Vigoro Red Mulch', bagSize: '2 cu ft', price: 3.97, deliveryFee: 79, inStock: true },
        { supplier: 'Menards', brand: 'Nature Scapes Mulch', bagSize: '2 cu ft', price: 3.49, deliveryFee: 59, inStock: true },
        { supplier: "Lowe's", brand: 'Sta-Green Mulch', bagSize: '2 cu ft', price: 4.15, deliveryFee: 69, inStock: true },
      ]
    },
  ];

  const calculateMaterials = () => {
    if (!length || !width || !depth) {
      Alert.alert('Error', 'Please fill in all measurements');
      return;
    }

    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth) / 12; // Convert inches to feet

    if (isNaN(l) || isNaN(w) || isNaN(d)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    const volume = l * w * d; // cubic feet
    const selectedMaterial = materialTypes.find(m => m.id === materialType);
    
    if (!selectedMaterial) return;

    // Calculate supplier options
    const supplierOptions: SupplierOption[] = selectedMaterial.suppliers.map(supplier => {
      const bags = Math.ceil(volume / selectedMaterial.coverage);
      const totalCost = bags * supplier.price;
      
      return {
        supplier: supplier.supplier,
        brand: supplier.brand,
        bagSize: supplier.bagSize,
        price: supplier.price,
        bags,
        totalCost,
        inStock: supplier.inStock,
        deliveryFee: supplier.deliveryFee,
      };
    }).sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost

    // Use the cheapest option for primary result
    const cheapestOption = supplierOptions[0];

    setResult({
      volume: Math.round(volume * 100) / 100,
      material: selectedMaterial.name,
      bags: cheapestOption.bags,
      estimatedCost: cheapestOption.totalCost,
      unit: cheapestOption.bagSize,
      coverage: selectedMaterial.coverage,
      supplierOptions,
    });

    // Scroll to results after a brief delay to ensure the result card is rendered
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const addToShoppingList = (supplierOption: SupplierOption) => {
    if (!result) return;
    
    const cartItem = {
      name: `${result.material} Mix`,
      brand: supplierOption.brand,
      supplier: supplierOption.supplier,
      price: supplierOption.price,
      unit: supplierOption.bagSize,
      quantity: supplierOption.bags,
    };
    
    addItem(cartItem);
    
    Alert.alert(
      'Added to Shopping List',
      `${supplierOption.bags} ${supplierOption.bagSize} bags of ${supplierOption.brand} from ${supplierOption.supplier} added to your shopping list!\n\nTotal: $${supplierOption.totalCost.toFixed(2)} + $${supplierOption.deliveryFee} delivery`
    );
  };

  const selectedMaterialInfo = materialTypes.find(m => m.id === materialType);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Calculator size={32} color="#F97316" />
          <Text style={styles.title}>Materials Calculator</Text>
          <Text style={styles.subtitle}>Calculate required construction materials with supplier pricing</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Project Measurements</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Length (feet)</Text>
            <TextInput
              style={styles.input}
              value={length}
              onChangeText={setLength}
              placeholder="40"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Width (feet)</Text>
            <TextInput
              style={styles.input}
              value={width}
              onChangeText={setWidth}
              placeholder="20"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Depth (inches)</Text>
            <TextInput
              style={styles.input}
              value={depth}
              onChangeText={setDepth}
              placeholder="2"
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.label}>Material Type</Text>
          <View style={styles.materialButtons}>
            {materialTypes.map((material) => (
              <TouchableOpacity
                key={material.id}
                style={[
                  styles.materialButton,
                  materialType === material.id && styles.materialButtonActive
                ]}
                onPress={() => setMaterialType(material.id)}
              >
                <Text
                  style={[
                    styles.materialButtonText,
                    materialType === material.id && styles.materialButtonTextActive
                  ]}
                >
                  {material.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedMaterialInfo && (
            <View style={styles.materialDescription}>
              <Text style={styles.materialDescriptionText}>
                {selectedMaterialInfo.description}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.calculateButton} onPress={calculateMaterials}>
            <Calculator size={20} color="#FFFFFF" />
            <Text style={styles.calculateButtonText}>Calculate Materials & Compare Prices</Text>
          </TouchableOpacity>
        </View>

        {result && (
          <>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Info size={24} color="#10B981" />
                <Text style={styles.resultTitle}>Calculation Results</Text>
              </View>

              <View style={styles.resultGrid}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Area</Text>
                  <Text style={styles.resultValue}>{length} × {width} ft</Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Volume Required</Text>
                  <Text style={styles.resultValue}>{result.volume} cu ft</Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Material</Text>
                  <Text style={styles.resultValue}>{result.material}</Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Coverage per Bag</Text>
                  <Text style={styles.resultValue}>{result.coverage} cu ft</Text>
                </View>
              </View>
            </View>

            <View style={styles.suppliersCard}>
              <View style={styles.suppliersHeader}>
                <TrendingUp size={24} color="#3B82F6" />
                <Text style={styles.suppliersTitle}>Supplier Price Comparison</Text>
              </View>

              {result.supplierOptions.map((option, index) => (
                <View key={`${option.supplier}-${option.brand}`} style={[
                  styles.supplierOption,
                  index === 0 && styles.bestDeal,
                  !option.inStock && styles.outOfStock
                ]}>
                  <View style={styles.supplierInfo}>
                    <View style={styles.supplierHeader}>
                      <Text style={styles.supplierName}>{option.supplier}</Text>
                      {index === 0 && (
                        <View style={styles.bestDealBadge}>
                          <Text style={styles.bestDealText}>BEST DEAL</Text>
                        </View>
                      )}
                      {!option.inStock && (
                        <View style={styles.outOfStockBadge}>
                          <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.brandName}>{option.brand}</Text>
                    <Text style={styles.bagInfo}>{option.bags} × {option.bagSize} bags</Text>
                    <Text style={styles.pricePerBag}>${option.price.toFixed(2)} per bag</Text>
                  </View>
                  
                  <View style={styles.supplierPricing}>
                    <Text style={styles.totalPrice}>${option.totalCost.toFixed(2)}</Text>
                    <Text style={styles.deliveryInfo}>+ ${option.deliveryFee} delivery</Text>
                    
                    <TouchableOpacity 
                      style={[
                        styles.addButton, 
                        (!option.inStock || isItemAdded(option.supplier, option.brand)) && styles.addButtonDisabled
                      ]} 
                      onPress={() => addToShoppingList(option)}
                      disabled={!option.inStock || isItemAdded(option.supplier, option.brand)}
                    >
                      <Plus size={16} color="#FFFFFF" />
                      <Text style={styles.addButtonText}>
                        {!option.inStock ? 'Unavailable' : 
                         isItemAdded(option.supplier, option.brand) ? 'Added' : 'Add to List'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  materialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  materialButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  materialButtonActive: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  materialButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  materialButtonTextActive: {
    color: '#FFFFFF',
  },
  materialDescription: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  materialDescriptionText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  calculateButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  resultGrid: {
    gap: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  suppliersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  suppliersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  suppliersTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  supplierOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bestDeal: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  outOfStock: {
    opacity: 0.6,
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  supplierInfo: {
    flex: 1,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  bestDealBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  bestDealText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  outOfStockBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  outOfStockText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  brandName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  bagInfo: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 2,
  },
  pricePerBag: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  supplierPricing: {
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 2,
  },
  deliveryInfo: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#F97316',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});