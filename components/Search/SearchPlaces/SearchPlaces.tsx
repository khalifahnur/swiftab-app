import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '@/constants/Colors';
import { router } from 'expo-router';

// Sample data for recently viewed restaurants
const recentlyViewedData = [
  {
    id: '1',
    name: 'The Plumed Horse',
    address: '14555 Big Basin Way, Saratoga, CA 95070',
    image: 'https://via.placeholder.com/60',
    rating: 4.7,
    cuisine: 'Fine Dining',
  },
  {
    id: '2',
    name: 'Che Fico San Francisco',
    address: '838 Divisadero St, San Francisco, CA 94117',
    image: 'https://via.placeholder.com/60',
    rating: 4.5,
    cuisine: 'Italian',
  },
  {
    id: '3',
    name: 'Son & Garden - San Francisco',
    address: '700 Polk St, San Francisco, CA 94109-7812',
    image: 'https://via.placeholder.com/60',
    rating: 4.6,
    cuisine: 'Asian Fusion',
  },
  {
    id: '4',
    name: 'Nairobi - Kenianisches Restaurant + Grill',
    address: 'Berliner Str. 31-35, 65760 Eschborn',
    image: 'https://via.placeholder.com/60',
    rating: 4.4,
    cuisine: 'Kenyan',
  },
  {
    id: '5',
    name: 'Charmaine\'s Rooftop Lounge',
    address: '45 McAllister, San Francisco, CA 94102',
    image: 'https://via.placeholder.com/60',
    rating: 4.8,
    cuisine: 'Cocktail Bar',
  },
];

const SearchPlaces = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Nairobi, Kenya');

  // Render a single restaurant item
  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity style={styles.restaurantItem}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantAddress}>{item.address}</Text>
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.cuisineTag}>{item.cuisine}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
  );

  // Category pills for quick filtering
  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.categoryPill, styles.activeCategoryPill]}>
          <Text style={styles.activeCategoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryPill}>
          <Text style={styles.categoryText}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryPill}>
          <Text style={styles.categoryText}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryPill}>
          <Text style={styles.categoryText}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryPill}>
          <Text style={styles.categoryText}>Coffee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryPill}>
          <Text style={styles.categoryText}>Dessert</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.green} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={()=>router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#E83C4B" />
        </TouchableOpacity>
      </View>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for places, foods, and special days"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Location Input */}
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="#4B89F0" style={styles.locationIcon} />
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity>
            <Ionicons name="locate" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Quick filters */}
      <View style={styles.quickFilters}>
        <TouchableOpacity style={styles.filterOption}>
          <MaterialIcons name="restaurant" size={20} color="#333" />
          <Text style={styles.filterText}>All Restaurants</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterOption}>
          <MaterialIcons name="bookmark-border" size={20} color="#333" />
          <Text style={styles.filterText}>Saved restaurants</Text>
        </TouchableOpacity>
      </View>
      
      {/* Category filters - Note: need to import ScrollView */}
      {/* {renderCategories()} */}
      
      {/* Recently viewed section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently viewed</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={recentlyViewedData}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#E83C4B',
    fontWeight: '500',
  },
  filterButton: {
    padding: 4,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#4B89F0',
  },
  quickFilters: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 16,
    paddingLeft: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeCategoryPill: {
    backgroundColor: '#E83C4B',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#E83C4B',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    paddingRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
    paddingVertical: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  cuisineTag: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});

export default SearchPlaces;