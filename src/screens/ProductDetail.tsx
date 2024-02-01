import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';

const ProductDetail = ({ route }:any) => {
  const { product } = route.params;

  console.log(product);


  const addToCart = () => {

    console.log(`Added ${product.name} to cart!`);
  };

  const buyNow = () => {

    console.log(`Buying ${product.name} now!`);
  };

  return (
    <View style={styles.container}>
        
      <Image style={styles.partImage} source={{ uri: product.ImageUrl }} />
      <Text style={styles.partName}>{product.name}</Text>
      <Text style={styles.partDescription}>{product.description.substring(0, 100) + '...'
      }</Text>
      <Text style={styles.partPrice}>{product.price}dt</Text>

      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={buyNow}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  partImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 8,
  },
  partName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  partDescription: {
    fontSize: 18,
    marginBottom: 16,
  },
  partPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
