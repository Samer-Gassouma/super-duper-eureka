import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductMini = (props:any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.productContainer} onPress={
          () => navigation.navigate('ProductDetail', { product: props.product }) 
    }>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.product.ImageUrl }}
          style={{width:'100%',height: '100%',resizeMode:props.productimgresizemode || 'contain'}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productname}>
          {props.product.name.length > 20
            ? props.product.name.substring(0, 18) + '..'
            : props.product.name}
        </Text>
        <Text style={styles.productdescription}>
          {props.product.description || props.product.discount}
        </Text>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    productContainer: {
      backgroundColor: '#fff',
      borderRadius: 15, 
      overflow: 'hidden',
      margin: 15,
      marginTop: 0,
      height: 350,
      width: 220,
      padding : 10,
    },
    imageContainer: {
      flex: 1.5, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImage: {
      width: '100%',
      height: '100%', 
      resizeMode: 'contain',
    },
    textContainer: {
      flex: 1,
      padding: 20, 
    },
    productname: {
      fontSize: 20, 
      fontWeight: 'bold',
    },
    productdescription: {
      fontSize: 18, 
      marginTop: 15, 
    },
    shopButton: {
      backgroundColor: '#000',
      marginTop: 10,
      marginBottom: 10, 
      padding: 15, 
      borderRadius: 10, 
      alignItems: 'center',
    },
    shopButtonText: {
      fontSize: 18,
      color: '#fff',
    },
  });

export default ProductMini;