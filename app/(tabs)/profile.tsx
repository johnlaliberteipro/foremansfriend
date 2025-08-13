import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, MapPin, Bell, CreditCard, CircleHelp as HelpCircle, Star, ChevronRight, Bookmark } from 'lucide-react-native';

export default function ProfileTab() {
  const profileOptions = [
    { id: 'projects', title: 'My Projects', icon: Bookmark, color: '#3B82F6' },
    { id: 'locations', title: 'Saved Locations', icon: MapPin, color: '#10B981' },
    { id: 'notifications', title: 'Notifications', icon: Bell, color: '#F59E0B' },
    { id: 'payment', title: 'Payment Methods', icon: CreditCard, color: '#8B5CF6' },
    { id: 'settings', title: 'Settings', icon: Settings, color: '#6B7280' },
    { id: 'help', title: 'Help & Support', icon: HelpCircle, color: '#EF4444' },
    { id: 'rate', title: 'Rate the App', icon: Star, color: '#F97316' },
  ];

  const handleOptionPress = (optionId: string) => {
    switch (optionId) {
      case 'projects':
        Alert.alert('My Projects', 'View and manage your saved construction projects');
        break;
      case 'locations':
        Alert.alert('Saved Locations', 'Manage your preferred supplier locations');
        break;
      case 'notifications':
        Alert.alert('Notifications', 'Configure your notification preferences');
        break;
      case 'payment':
        Alert.alert('Payment Methods', 'Add or edit payment methods');
        break;
      case 'settings':
        Alert.alert('Settings', 'App settings and preferences');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Get help or contact support');
        break;
      case 'rate':
        Alert.alert('Rate the App', 'Please rate us on the App Store!');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <User size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.userName}>John Constructor</Text>
            <Text style={styles.userEmail}>john.contractor@email.com</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$47,890</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Suppliers</Text>
          </View>
        </View>

        <View style={styles.optionsSection}>
          {profileOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => handleOptionPress(option.id)}
            >
              <View style={styles.optionLeft}>
                <View style={[styles.optionIcon, { backgroundColor: option.color + '15' }]}>
                  <option.icon size={20} color={option.color} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <ChevronRight size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 Construction Calculator</Text>
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
  },
  header: {
    backgroundColor: '#F97316',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EA580C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#FED7AA',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  optionsSection: {
    paddingHorizontal: 20,
    gap: 2,
  },
  optionItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});