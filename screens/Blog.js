import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html';
import MyCarousel from '../components/MyCarousel'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import SIZES from '../constants/fontsize'
import { ScrollView } from 'react-native'
import COLORS from '../constants/colors';
import { getActiveBlog, getByUser } from '../rest/api/blog';
import { parseImg } from '../utils/index';

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon ',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
]

const Blog = ({ navigation }) => {
    const [blogData, setBlogData] = useState([])

    const getAllBlog = async () => {
        try {
            const res = await getActiveBlog()
            setBlogData(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        //getBlogUser()
        getAllBlog()
    }, [blogData])

    const handleNavigate = (item) => {
        navigation.navigate('BlogDetail', item)
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.myBlog}>Bài viết của bạn</Text>
            <MyCarousel />
            <View style={{ marginBottom: 100 }}>
                <Text style={styles.myBlog}>Các bài viết khác</Text>
                {blogData.length > 0 ? (
                    blogData.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => handleNavigate(item)} key={index}>
                            <View style={styles.blogContainer}>
                                <Image source={{
                                    uri: parseImg(item.thumbnail),
                                }} style={styles.image} />
                                <Text style={styles.blogText} numberOfLines={2}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (<ActivityIndicator size='large' />)}
            </View>
        </ScrollView>
    )
}

export default Blog

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    myBlog: {
        fontWeight: 'bold',
        fontSize: SIZES.h2,
        marginTop: 40,
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 150,
        objectFit: 'cover',
        borderRadius: 10
    },
    blogContainer: {
        padding: 10,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        elevation: 5,
        marginTop: 10
    },
    blogText: {
        fontWeight: 'bold',
        fontSize: SIZES.title,
        padding: 10
    }
})