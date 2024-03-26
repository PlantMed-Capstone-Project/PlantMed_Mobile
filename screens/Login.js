import { useState } from 'react'
import {
    Alert,
    Image,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_KEY } from '../constants/base'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { login } from '../rest/api/auth'
import { parseJwt } from '../utils/index'
import {
    storeAsString,
    storeObjectOrArray
} from '../utils/store'
const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const validate = () => {
        //navigation.navigate('HomePage')
        Keyboard.dismiss()
        let valid = true
        if (!inputs.email) {
            handleError('Vui lòng nhập email', 'email')
            valid = false
        }
        if (!inputs.password) {
            handleError('Vui lòng nhập mật khẩu', 'password')
            valid = false
        }

        if (valid) {
            hanldeLogin()
        }
    }
    const clearInput = () => {
        setInputs({})
    }
    const hanldeLogin = () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            try {
                let response = await login(inputs)
                await storeToken(response.data)
                const userData = parseJwt(response.data.accessToken)
                await storeObjectOrArray(USER_KEY, {
                    ...userData,
                    isLogin: true,
                })
                navigation.replace('HomePage')
            } catch (error) {
                Alert.alert('Lỗi', 'Email hoặc mật khẩu đăng nhập không đúng')
                console.log(error)
            }
            //clearInput()
        }, 2000)
    }

    const storeToken = async (data) => {
        await storeAsString(ACCESS_TOKEN, data.accessToken)
        await storeAsString(REFRESH_TOKEN, data.refreshToken)
    }
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }
    const handleError = (errorMess, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMess }))
    }
    return (
        <View style={styles.container}>
            <Loader visible={loading} />
            <Image
                source={require('../assets/loginScreen1.png')}
                style={styles.imageCustom}
            />
            <Icon
                name="arrow-left"
                style={{
                    fontSize: SIZES.icon,
                    marginTop: 50,
                    marginLeft: 25,
                    color: COLORS.white,
                }}
                onPress={() => navigation.goBack()}
            />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 250,
                    paddingHorizontal: 30,
                }}>
                <Text style={styles.headerText}>Đăng nhập</Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        icon="account"
                        placeholder="Email"
                        onChangeText={text => handleOnChange(text, 'email')}
                        onFocus={() => {
                            handleError(null, 'email')
                        }}
                        error={errors.email}
                        value={inputs.email}
                    />
                    <Input
                        icon="lock"
                        placeholder="Mật khẩu"
                        password
                        onChangeText={text => handleOnChange(text, 'password')}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        error={errors.password}
                        value={inputs.password}
                    />
                </View>
                <Button
                    title="Đăng nhập"
                    colorFrom={COLORS.primary}
                    colorTo={COLORS.secondary}
                    textColor={COLORS.white}
                    onPress={validate}
                />
                <Text
                    style={{
                        marginTop: 15,
                        textAlign: 'center',
                        color: COLORS.primary,
                    }}
                    onPress={() => navigation.navigate('SignUp')}>
                    Bạn chưa có tài khoản? Đăng ký
                </Text>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        position: 'relative',
    },
    headerText: {
        color: COLORS.secondary,
        textTransform: 'uppercase',
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageCustom: {
        width: 596,
        height: 745,
        position: 'absolute',
        zIndex: -1,
        top: -450,
        transform: [{ rotate: '40deg' }],
    },
})
