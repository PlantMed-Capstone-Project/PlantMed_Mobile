import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { storeAsString } from '../utils/store'
import { ONBOARDED } from '../constants/base'

const { width, height } = Dimensions.get('window')

const Tutorial = () => {
    const navigation = useNavigation()
    const handleDone = () => {
        setTimeout(async () => {
            await storeAsString(ONBOARDED, 'onboarded')
        }, 2000)
        navigation.navigate('Welcome')
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.buttonDone} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Onboarding
                containerStyles={{ paddingHorizontal: 15, }}
                titleStyles={{ fontWeight: 'bold' }}
                subTitleStyles={{ fontWeight: 'bold' }}
                DoneButtonComponent={doneButton}
                onSkip={handleDone}
                onDone={handleDone}
                pages={[
                    {
                        backgroundColor: COLORS.secondary,
                        image: <View style={styles.lottie}>
                            <LottieView source={require('../assets/lottie/welcome-onboarding.json')} autoPlay loop />
                        </View>,
                        title: 'Chào mừng',
                        subtitle: 'Chào mừng bạn đến với PlanMed',
                    },
                    {
                        backgroundColor: COLORS.light,
                        image: <View style={styles.lottie}>
                            <LottieView source={require('../assets/lottie/welcome-onboarding.json')} autoPlay loop />
                        </View>,
                        title: 'Thực vật',
                        subtitle: 'Viết cái gì đó',
                    },
                    {
                        backgroundColor: COLORS.secondary,
                        image: <View style={styles.lottie}>
                            <LottieView source={require('../assets/lottie/blog.json')} autoPlay loop />
                        </View>,
                        title: 'Bài viết',
                        subtitle: 'Gì đó',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    buttonDone: {
        padding: 20,
    }
})

export default Tutorial