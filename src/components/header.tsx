import React from "react";
import { Dimensions, View, Text, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInnerContainer}>
                    <Text>
                        <Icon name="search" size={28} />
                    </Text>
                    <TextInput
                        placeholder='Search for products'
                        style={styles.searchInput}
                    />
                </View>
            </View>
            <View style={styles.cartContainer}>
                <Text style={styles.cartIcon}>
                    <Icon name="cart" size={40} />
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15, 
        marginTop: 25,
    },
    searchContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1.5, // Increase border width
        borderColor: "#d4d4d4",
        borderRadius: 25, // Increase border radius
        height: 55, // Increase height
        marginRight: 15, // Increase margin right
    },
    searchInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15, // Increase padding
    },
    searchInput: {
        flex: 1,
        marginLeft: 15, // Increase margin left
        fontSize: 18, // Increase font size
    },
    cartContainer: {
        flex: 0.2,
    },
    cartIcon: {
        textAlign: 'center',
    },
});