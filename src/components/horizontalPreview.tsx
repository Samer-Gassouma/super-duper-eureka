import { StyleSheet, View, Text, ScrollView } from 'react-native';
import ProductMini from './productmini';

const Preview = (props:any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {props.products.map((data:any, i:any) => {
          return (
            <ProductMini
              key={i}
              width={props.width || 'auto'}
              height={props.height || 'auto'}
              productTitleStyle={props.productTitleStyle}
              productimgheight={props.productimgheight}
              productimgresizemode={props.productimgresizemode || 'contain'}
              product={data}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10, 
    paddingLeft: 20, 
    marginBottom: 40, 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  scrollContainer: {
    marginTop: 35, 
  },
});

export default Preview;