import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Detail = ({ navigation, route }) => {
    const plant = route.params;

    const plantDetail = {
        "Tên quốc tế": plant.internationalName,
        "Họ": plant.surName,
        "Nơi sing trưởng": plant.placeOfBirth,
        "Nơi bán": plant.shopBase,
        "Nguồn gốc": plant.origin,
        "Cách sử dụng": plant.usage
    };

    const renderDetail = () => {
        return <View>
            {Object.keys(plantDetail).map((key, index) => (
                <View key={index}>
                    <Text style={{ fontSize: SIZES.base, marginTop: 5 }}><Text style={{ fontWeight: '600' }}>{key}:</Text> {plantDetail[key]}</Text>
                </View>
            ))}
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <Icon
                name="arrow-left"
                size={30}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 30 }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    // source={{ uri: plant.image }}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnR8ZW58MHx8MHx8fDA%3D',
                    }}
                    style={{ height: 300, width: '100%', resizeMode: 'contain', flex: 1 }}
                    resizeMode="contain"
                />
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>
                        {plant.name}
                    </Text>
                    {renderDetail()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        flex: 1,
    },
})
export default Detail
