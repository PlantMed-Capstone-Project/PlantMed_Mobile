import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'

const Detail = ({ navigation, route }) => {
    const plant = route.params

    const plantDetail = {
        'Tên quốc tế': plant.internationalName,
        Họ: plant.surName,
        'Nơi sing trưởng': plant.placeOfBirth,
        'Nơi bán': plant.shopBase,
        'Nguồn gốc': plant.origin,
        'Cách sử dụng': plant.usage,
    }

    const renderDetail = () => {
        return (
            <View>
                {Object.keys(plantDetail).map((key, index) => (
                    <View key={index}>
                        <Text style={{ fontSize: SIZES.base, marginTop: 5 }}>
                            <Text style={{ fontWeight: '600' }}>{key}:</Text>{' '}
                            {plantDetail[key]}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Icon
                name="arrow-left"
                size={30}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 30, marginTop: 40 }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={{
                        uri: `${plant.images[0].data}`,
                    }}
                    style={{
                        height: 300,
                        width: '100%',
                        resizeMode: 'contain',
                        flex: 1,
                    }}
                    resizeMode="contain"
                />
                <View style={{ marginTop: 20, marginBottom: 50 }}>
                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>
                        {plant.name}
                    </Text>
                    {renderDetail()}
                </View>
            </ScrollView>
        </View>
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
