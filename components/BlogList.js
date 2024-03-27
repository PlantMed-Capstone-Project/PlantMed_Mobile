import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'
import { parseImg } from '../utils'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'

const LikeAnimate = ({ like, item, handleNavigate }) => {
    const [isLike, setIsLike] = useState(like)
    const animation = useRef(null)
    const isFirstRun = useRef(true)
    useEffect(() => {
        if (isFirstRun.current) {
            if (isLike) {
                animation.current.play(18, 18)
            } else {
                animation.current.play(0, 0)
            }
            isFirstRun.current = false
        } else if (isLike) {
            animation.current.play(1, 19)
        } else {
            animation.current.play(19, 1)
        }
    }, [isLike])

    const handleLike = () => {
        setIsLike((prevState) => !prevState)
    }
    const callback = () => {
        handleNavigate(item)
    }
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={callback}>
            <View style={styles.blogContainer}>
                <View style={styles.insideImg}>
                    {item.tags.map((data) => (
                        <Text key={data.id} style={styles.tags}>{data.name}</Text>
                    ))}
                </View>
                <TouchableOpacity onPress={handleLike} activeOpacity={0.8} style={styles.likeBox}>
                    <LottieView ref={animation} source={require('../assets/lottie/like.json')} style={{ width: 70, height: 70 }} autoPlay={false} loop={false} />
                </TouchableOpacity>

                <Image source={{
                    uri: parseImg(item.thumbnail),
                }} style={styles.image} />
                <Text style={styles.blogText} numberOfLines={2}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 10,
    },
    blogText: {
        fontWeight: 'bold',
        fontSize: SIZES.title,
        padding: 10
    },
    insideImg: {
        zIndex: 10,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    tags: {
        textTransform: 'uppercase',
        color: COLORS.black,
        fontWeight: 'bold',
        padding: 4,
        width: 'auto',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        marginBottom: 10,
    },
    likeBox: {
        position: 'absolute',
        right: 20,
        top: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        width: 50,
        height: 50,
    }

})

export default LikeAnimate