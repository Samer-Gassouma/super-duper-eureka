import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Image, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import ProductMini from './productmini';

const AllProducts = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.productList}>
                {
                    props.products.map((data, i) => {
                        return (
                            <ProductMini
                                width="45%"
                                vertical={true}
                                productStyle={[
                                    styles.productMargin,
                                    i % 2 ? styles.marginLeft10 : styles.marginLeft5
                                ]}
                                key={i}
                                product={data}
                            />
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, // Increase padding
        marginBottom: 40, // Increase margin bottom
    },
    title: {
        fontSize: 22, // Increase font size
        fontWeight: 'bold',
        paddingLeft: 10, // Increase padding left
        paddingTop: 10, // Increase padding top
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20, // Increase margin top
    },
    productMargin: {
        marginBottom: 40, // Increase margin bottom
    },
    marginLeft10: {
        marginLeft: 20, // Increase margin left
    },
    marginLeft5: {
        marginLeft: 10, // Increase margin left
    },
});

export default AllProducts;