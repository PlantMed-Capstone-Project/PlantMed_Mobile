import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { getAll } from '../rest/api/plant'
import { getAvatar } from '../rest/api/user'
import { normalizeAndUpper } from '../utils'
import { parseImg } from '../utils/store'
// import useDebounce from '../hooks/useDebouce'

const width = Dimensions.get('screen').width / 2 - 30

const Home = ({ navigation }) => {
    const [data, setData] = useState(null)
    const [search, setSearch] = useState(null)
    const [userAvatar, setUserAvatar] = useState(null)
    // const searchDebounce = useDebounce(search, 500)

    async function fetchAvatar() {
        try {
            const avatar = await getAvatar()
            setUserAvatar(avatar.data)
        } catch (error) {
            alert(error)
        }
    }

    async function fetchData() {
        try {
            const res = await getAll()
            setSearch(res.data)
            setData(res.data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        fetchAvatar()
        fetchData()
    }, [])

    const searchFilter = text => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.name && normalizeAndUpper(item.name)
                const textData = normalizeAndUpper(text)
                return itemData.indexOf(textData) > -1
            })
            setSearch(newData)
        } else {
            setSearch(data)
        }
    }

    const getTopSearch = () => {
        //console.log("Vô đây");
    }

    const Card = ({ plants }) => {
        return (

            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', plants)}>
                <View style={styles.card}>

                    <Image
                        style={{
                            flex: 1,
                            width: '100%',
                            resizeMode: 'cover',
                            borderRadius: 10
                        }}
                        source={{
                            uri: `${plants.images[0].data}`,
                        }}
                    />

                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: SIZES.title,
                            marginTop: 10,
                            marginBottom: 10
                        }}>
                        {plants.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingTop: 20,
            }}>
            <View style={styles.header}>
                <View>
                    <Text
                        style={{ fontSize: SIZES.header, fontWeight: 'bold' }}>
                        Welcome to
                    </Text>
                    <Text
                        style={{
                            fontSize: SIZES.h2,
                            fontWeight: 'bold',
                            color: COLORS.primary,
                        }}>
                        Plant Med
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <View style={{ marginTop: 10 }}>
                        {userAvatar ? (<Avatar
                            rounded
                            source={{
                                uri: userAvatar
                                    ? parseImg(userAvatar)
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mp8VzZ-J9ZiXn6f4vNmU1BlX0D7YzrFhag&usqp=CAU',
                            }}
                        />) : (<ActivityIndicator />)}
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <Icon
                        name="magnify"
                        size={SIZES.icon}
                        style={{ marginLeft: 15 }}
                    />
                    <TextInput
                        placeholder="Tìm kiếm"
                        style={styles.input}
                        onBlur={() => {
                            getTopSearch()
                        }}
                        onChangeText={text => searchFilter(text)}></TextInput>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={Keyboard.dismiss}>
                    <View style={styles.sortBtn}>
                        <Icon name="filter-variant" size={SIZES.icon} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <View style={{ position: 'relative' }}>
                    <Image
                        style={{
                            height: 150,
                            width: '100%',
                            resizeMode: 'cover',
                        }}
                        source={require('../assets/sectionHero.png')}
                    />
                    <Text style={styles.insideImage}>
                        HƠN 30K LOÀI THỰC VẬT ĐỂ BẠN TÌM KIẾM
                    </Text>
                </View>
            </View>

            <FlatList
                onScroll={Keyboard.dismiss}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={search}
                renderItem={({ item }) => <Card plants={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: '100%',
        marginLeft: 10,
    },
    sortBtn: {
        marginLeft: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: 170,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 15,
        padding: 7,
        backgroundColor: "#E1F0DA",

    },
    insideImage: {
        position: 'absolute',
        alignSelf: 'center',
        width: '75%',
        top: 50,
        fontSize: SIZES.heroSection,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.white,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
})

export default Home
