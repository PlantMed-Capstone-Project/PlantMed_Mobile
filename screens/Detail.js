import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../constants/colors';
import SIZES from '../constants/fontsize';

const Detail = ({ navigation, route }) => {
    const plants = route.params;
    console.log(plants);
    return (
        <SafeAreaView style={styles.container}>
            <Icon name="arrow-left" size={30} onPress={() => navigation.goBack()} style={{ marginBottom: 30 }} />
            <ScrollView>
                <Image source={{ uri: plants.image }} style={{ height: 300, width: "100%" }} resizeMode='contain' />
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{plants.title}</Text>
                    <Text style={{ fontSize: SIZES.base, marginTop: 10 }}>{plants.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        flex: 1
    }
})
export default Detail