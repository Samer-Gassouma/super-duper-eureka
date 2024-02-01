import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';

const Banner = (props:any) => {
    return (
        <View style={styles.centerContainer}>
            <TouchableOpacity style={[styles.container, { width: props.width || 'auto', height: props.height || 'auto' }, !props.hero && styles.padding]}>
                <Image source={{ uri: props.image }} style={styles.image} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 30, 
        overflow: 'hidden', 
        
        elevation: 14, // Add shadow for Android
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    padding: {
        padding: 5, 
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Banner;