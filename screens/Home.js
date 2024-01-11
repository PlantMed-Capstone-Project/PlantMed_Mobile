import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const width = Dimensions.get('screen').width / 2 - 30;

const Home = ({ navigation }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    alert(error);
                }
            )
    }, []);
    const Card = ({ plants }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', plants)}>
                <View style={styles.card}>
                    <View style={{ height: 100, alignItems: 'center' }}>
                        <Image style={{ flex: 1, width: 100, resizeMode: 'contain' }} source={{ uri: plants.image }} />
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 25, alignItems: 'center' }}>
                        {plants.title}
                    </Text>
                </View>
            </TouchableOpacity >
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: COLORS.white }}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: SIZES.header, fontWeight: 'bold' }}>Welcome to</Text>
                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold', color: COLORS.primary }}>Plant Med</Text>
                </View>
                <TouchableOpacity>
                    <View style={{ marginTop: 10 }}><Avatar rounded source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mp8VzZ-J9ZiXn6f4vNmU1BlX0D7YzrFhag&usqp=CAU' }} /></View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <Icon name="magnify" size={SIZES.icon} style={{ marginLeft: 15 }} />
                    <TextInput placeholder='Tìm kiếm' style={styles.input}></TextInput>
                </View>
                <TouchableOpacity activeOpacity={0.6}>
                    <View style={styles.sortBtn}>
                        <Icon name="filter-variant" size={SIZES.icon} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: SIZES.base, marginBottom: 20 }}>Tìm kiếm nổi bật</Text>
                <View style={{ position: 'relative' }}>
                    <Image style={{ height: 150, width: '100%', resizeMode: 'cover' }} source={require('../assets/conganh.png')} />
                    <Text style={styles.insideImage}>Bồ công anh</Text>
                </View>
            </View>

            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                    backgroundColor: COLORS.lightgreen
                }}
                numColumns={2}
                data={data}
                renderItem={({ item }) => <Card plants={item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchContainer: {
        height: 50,
        backgroundColor: COLORS.lightgreen,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        width: "100%",
        marginLeft: 10
    },
    sortBtn: {
        marginLeft: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        height: 200,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    insideImage: {
        position: 'absolute',
        alignSelf: 'center',
        top: 30,
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.black
    }
})

export default Home