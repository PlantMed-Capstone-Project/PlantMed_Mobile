import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SIZES from '../constants/fontsize'
import { convertTimeStamp, parseImg } from '../utils/index'
import RenderHtml from 'react-native-render-html'

const BlogDetail = ({ navigation, route }) => {

    const blog = route.params
    console.log(blog)
    const time = convertTimeStamp(blog.releaseDate)
    const { width } = useWindowDimensions()
    const source = {
        html: `${blog.content}`
    }
    return (
        <View style={styles.container}>
            <Icon
                name="arrow-left"
                size={30}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 20, marginTop: 40 }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.textGray}>{time}</Text>
                <Text style={styles.title}>{blog.title}</Text>
                <View style={styles.author}>
                    <Text style={styles.textGray}>{blog.user.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        {blog.tags.map((data, index) => (<Text key={index} style={styles.tag}>{data.name}</Text>))}
                    </View>
                </View>
                <Image source={{ uri: parseImg(blog.thumbnail) }} style={styles.thumbnail} />
                <RenderHtml contentWidth={width} source={source} />
            </ScrollView>
        </View>
    )
}

export default BlogDetail

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: COLORS.white
    },
    textGray: {
        color: COLORS.gray
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: SIZES.title
    },
    author: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tag: {
        backgroundColor: COLORS.tag,
        borderRadius: SIZES.radius,
        padding: 10,
        color: COLORS.white,
        fontWeight: 'bold'
    },
    thumbnail: {
        marginTop: 20,
        width: '100%',
        height: 150,
        objectFit: 'cover'
    }
})