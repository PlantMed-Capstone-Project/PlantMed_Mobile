import React, { useRef, useState, useEffect } from 'react'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
} from 'react-native'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { useNavigation } from '@react-navigation/native'
import { getByUser } from '../rest/api/blog'
import { parseImg } from '../utils/index'

const { width: screenWidth } = Dimensions.get('window')

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
            name: 'Bạc xỉu'
        }
        ],
        isLike: true,
        thumbnail: "https://raw.githubusercontent.com/PlantMed-Capstone-Project/PlantMed_Web/data/images/Sài Đất-000.jpeg"
    }
]

const MyCarousel = () => {
    const [blogData, setBlogData] = useState()

    const getBlogUser = async () => {
        try {
            const res = await getByUser()
            setBlogData(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getBlogUser()
        //setBlogData(fakeData)
    }, [])
    const navigation = useNavigation()
    const carouselRef = useRef(null)

    const goForward = () => {
        carouselRef.current.snapToNext()
    }

    const handleNavigate = (item) => {
        navigation.navigate("BlogDetail", item)
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleNavigate(item)}>
                <View style={styles.item}>
                    <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                        {item.tags.map((data) => (
                            <Text key={data.id} style={styles.tags}>{data.name}</Text>
                        ))}
                    </View>
                    <ParallaxImage
                        source={{ uri: parseImg(item.thumbnail) }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {blogData ? (
                blogData.length > 0 ? (
                    <>
                        <Carousel
                            layout={'tinder'}
                            layoutCardOffset={2}
                            ref={carouselRef}
                            sliderWidth={screenWidth}
                            sliderHeight={screenWidth}
                            itemWidth={screenWidth - 60}
                            data={blogData}
                            renderItem={renderItem}
                            hasParallaxImages={true}
                        />
                        <TouchableOpacity onPress={goForward}>
                            <Text>Vuốt để chuyển qua bài viết khác</Text>
                        </TouchableOpacity></>
                ) : (<Text>Bạn chưa có bài viết nào</Text>)
            ) : (<ActivityIndicator size='large' />
            )}

        </View>
    );
};

export default MyCarousel

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 200,
        padding: 15,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        elevation: 5,
        marginTop: 10,
        marginBottom: 10
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 10,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    title: {
        fontWeight: 'bold',
        fontSize: SIZES.title,
        marginTop: 10,
        marginHorizontal: 10
    },
    tags: {
        textTransform: 'uppercase',
        color: COLORS.black,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginBottom: 10
    },
})
