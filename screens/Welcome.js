import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'
import Logo from '../assets/Logo.jpg'
import Button from '../components/Button'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import LottieView from 'lottie-react-native'
import { readStorage } from '../utils/store'
import { USER_KEY } from '../constants/base'
import { useEffect } from 'react'


const { width, height } = Dimensions.get('window')

const Welcome = ({ navigation }) => {
    const getDetail = async () => {
        let data = await readStorage(USER_KEY)
    }

    useEffect(() => {
        getDetail()
    }, [])
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.text}>
                        Welcome to
                        <Text style={{ color: COLORS.primary }}>
                            {' '}
                            PlantMed.
                        </Text>
                    </Text>
                </View>
                <Text
                    style={{
                        marginTop: 10,
                        color: COLORS.gray,
                        textAlign: 'center',
                        fontSize: SIZES.base,
                    }}>
                    Enjoy the experience.
                </Text>
            </View>

            <Image source={Logo} style={{ width, height: height / 2, marginTop: -50, zIndex: -1 }} />
            <View style={styles.welcome}>
                <LottieView source={require('../assets/lottie/welcome.json')} autoPlay loop />
            </View>
            <View
                style={{
                    width: '75%',
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <Button
                    title="Đăng nhập"
                    colorFrom={COLORS.primary}
                    colorTo={COLORS.secondary}
                    textColor={COLORS.white}
                    onPress={() => navigation.navigate('Login')}
                />
                <Button
                    title="Đăng ký"
                    colorFrom={COLORS.white}
                    colorTo={COLORS.white}
                    textColor={COLORS.black}
                    onPress={() => navigation.navigate('SignUp')}
                />
                <Text
                    style={{
                        color: COLORS.gray2,
                        marginBottom: 30,
                        marginTop: 20,
                    }}>
                    Điều khoản dịch vụ
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: COLORS.white,
    },
    text: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
    },
    welcome: {
        height: 300,
        width: 300,
        marginTop: -150,
    }
})

export default Welcome
