import React, { useEffect, useState } from 'react';
import { View,TextInput, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';
import getApi from '../../api/getApi';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../initSupabase';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
  imageKey: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation();


  useEffect(() => {
    const getProducts = async () => {
      const { data: products, error } = await supabase
        .from<Product>('Products')
        .select('*');
      if (error) {
        console.log(error.message);
        return;
      }
      setProducts(products || []);
      setIsLoading(false);
    };
    getProducts();
  }, []);



  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product?.name.includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
  <TextInput
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <View style={styles.productCard} key={product.id}>
              <TouchableOpacity onPress={
          () => navigation.navigate('ProductDetail', { product: product }) 
    }>
                <Image source={{ uri: product.ImageUrl }} style={styles.productImage} />
              </TouchableOpacity>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>
                {product.description}
              </Text>
              <Text style={styles.productPrice}>{product.price}dt</Text>
              <TouchableOpacity style={styles.productButton}>
                <Text style={styles.productButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  productButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  productButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Products;