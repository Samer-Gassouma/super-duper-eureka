import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { Layout, Text, Button, useTheme, themeColor, TextInput } from "react-native-rapi-ui";
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from "../initSupabase";
import { Picker } from '@react-native-picker/picker';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function AddResourceScreen() {
  const { isDarkmode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingProg, setLoadingProg] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [file, setFile] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState([]);

  const navigation = useNavigation();

  const handleUpload = async () => {
    if (!productName || !productDescription || !productPrice || !file) {
      Alert.alert("All fields are required");
      return;
    }
    console.log(productName, productDescription, productPrice, file);

    try {
      setLoadingProg(true);
      const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
      const filePath = `${productName}${new Date().getTime()}.${file.mimeType.split('/')[1]}`;
      const contentType = file.mimeType;

      try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('store')
        .upload(
          filePath,
          decode(base64),
          {
            contentType,
            onProgress: (event) => {
              const progress = (event.loaded / event.total) * 100;
              setUploadProgress(progress);
            },

          }
        );

      if (uploadError) {
        console.error("Error uploading file:", uploadError.message || uploadError);
        return;
      }
      else{
        const { publicURL, error: urlError } = supabase.storage
        .from('store')
        .getPublicUrl(filePath);
          if (urlError) {
            console.error("Error getting URL:", urlError.message || urlError);
            return;
          }
          
        const { data, error } = await supabase.from('Products').insert([
          { name: productName, description: productDescription, price: productPrice,imageKey:filePath ,ImageUrl: publicURL },
        ]);
        if (error) {
          Alert.alert("Error adding new product");
          console.log(error);
          return;
        }
        else {
          Alert.alert("New product added successfully");
          return;
        }
      }
    } 
    catch (error) {
      console.error("Error uploading file:", error.message || error);
    }


    } catch (error) {
      console.error("Error uploading file:", error.message || error);
    }
    finally {
      setLoadingProg(false);
    }

  }

     

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result.assets[0]);
    if (result.assets[0].uri !== undefined) {
      setFile(result.assets[0]);
    }

    /*
    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const filePath = `${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
      await supabase.storage.from('store').upload(filePath, decode(base64), { contentType });
    }*/
  };
  if(loading) {
    return (
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }

  if(loadingProg) {
    return (
      <Spinner
        visible={loadingProg}
        textContent={'Prosessing...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Add Product</Text>

        <View style={styles.formContainer}>
          <Button text="Go BACK" onPress={() => navigation.goBack()} />
          <Text>Product Name</Text>
          <TextInput
            containerStyle={{ marginTop: 10 }}
            placeholder="Enter Product name"
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />

        <Text>Product Description</Text>
        <TextInput
          containerStyle={{ marginTop: 10 }}
          placeholder="Enter Product Description"
          value={productDescription}
          onChangeText={(text) => setProductDescription(text)}
        />
        <Text>Price</Text>
        <TextInput
          containerStyle={{ marginTop: 10 }}
          placeholder="Enter Product Price"
          value={productPrice}
          onChangeText={(text) => setProductPrice(text)}
        />  
      
      
          <Button
            text="Pick File"
            style={styles.pickFileButton}
            onPress={onSelectImage}
          />

          {file && <Text style={{ marginTop: 10 }}>Selected Image: {file.name}</Text>}

          {uploadProgress > 0 && (
            <View style={styles.progressBarContainer}>
              <Text style={{ marginTop: 10 }}>Upload Progress: {uploadProgress.toFixed(2)}%</Text>
              <View style={styles.progressBar}>
                <View
                  style={{
                    width: `${uploadProgress}%`,
                    height: 10,
                    backgroundColor: themeColor.dark,
                  }}
                />
              </View>
            </View>
          )}

          <Button
            text="Upload Product"
            onPress={handleUpload}
            style={styles.uploadButton}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  pickFileButton: {
    marginTop: 10,
    backgroundColor: themeColor.primary,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: themeColor.success,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: themeColor.white,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
});
