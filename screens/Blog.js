import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MyCarousel from '../components/MyCarousel'
import SIZES from '../constants/fontsize'
import { getActiveBlog } from '../rest/api/blog'
import BlogList from '../components/BlogList'
import { readStorage } from '../utils/store'
import { USER_KEY } from '../constants/base'

const fakeData = [
    {
        title: 'Phuong test',
        tags: [{
            id: 1,
            name: 'Cầu tử'
        },
        {
            id: 2,
            name: 'Bạc hà'
        }
        ],
        isLike: false,
        thumbnail: "https://raw.githubusercontent.com/PlantMed-Capstone-Project/PlantMed_Web/data/images/Sài Đất-000.jpeg"
    },
    {
        title: 'Ai test test',
        tags: [{
            id: 1,
            name: 'Cầu tử'
        },
        {
            id: 2,
            name: 'Bạc xỉu xỉu xỉu'
        }
        ],
        isLike: true,
        thumbnail: "https://raw.githubusercontent.com/PlantMed-Capstone-Project/PlantMed_Web/data/images/Sài Đất-000.jpeg"
    },
    {
        title: 'Ai test test',
        tags: [
        ],
        isLike: true,
        thumbnail: "https://raw.githubusercontent.com/PlantMed-Capstone-Project/PlantMed_Web/data/images/Sài Đất-000.jpeg"
    }
]

const Blog = ({ navigation }) => {
    const getUserDetail = async () => {
        try {
            let userData = await readStorage(USER_KEY)
            if (userData) {
                setUser(userData)
            }
            //console.log(userDetail)
        } catch (error) { }
    }
    const [user, setUser] = useState()
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
        getAllBlog()
        getUserDetail()
        //setBlogData(fakeData)
    }, [])

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
                    blogData.map((item, index) => {
                        const checkLike = item.userLike.find(({ email }) => user.Email === email)
                        return (
                            <BlogList key={index} item={item} like={checkLike} handleNavigate={handleNavigate} />
                        )
                    })
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

})