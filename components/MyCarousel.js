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

const MyCarousel = () => {
    const [blogData, setBlogData] = useState([])

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
    }, [blogData])
    const navigation = useNavigation()
    const [entries, setEntries] = useState([])
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
            {blogData.length > 0 ? (<>
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
                </TouchableOpacity>
            </>) : (<ActivityIndicator size='large' />
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
    }
})
