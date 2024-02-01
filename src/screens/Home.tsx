import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import Preview from '../components/horizontalPreview';
import Banner from '../components/banner';
import Header from '../components/header';
import { supabase } from '../initSupabase';
import { Product } from '../types';


export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);

	const [isLoading,setIsLoading]=useState(true);

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
	
	

    
  return (
    <ScrollView >
		
		<Header />
		{isLoading ?
			<View >
				<ActivityIndicator size={50} color="#000" />
			</View>
			:
			<>
			<Banner  width="100%" height={150} image="https://btcpeers.com/content/images/2021/09/1.jpg"></Banner>
			<Preview title="Top Products" products={products} />
			<Preview title="Recently Viewed" products={products} />
			</>
		}
		
		</ScrollView>
  );
};


