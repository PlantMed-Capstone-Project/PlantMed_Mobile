import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { USER_KEY } from '../constants/base'
import { login } from '../rest/api/auth'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
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
import { readStorage, storeObjectOrArray } from '../utils/store'

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        cccd: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const validate = () => {
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
        setInputs({
            email: '',
            cccd: '',
            phone: '',
            password: '',
            confirmPassword: '',
        })
    }
    const hanldeLogin = () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            let userData = await readStorage(USER_KEY)
            if (userData) {
                if (
                    inputs.email == userData.email &&
                    inputs.password == userData.password
                ) {
                    storeObjectOrArray(USER_KEY, {
                        ...userData,
                        isLogin: true,
                    })
                    try {
                        const user = [inputs.email, ...inputs.password]
                        let token = await login(user)
                        console.log(token)
                    } catch (error) {
                        alert(error)
                    }
                    clearInput()
                    navigation.navigate('HomePage')
                } else {
                    Alert.alert('Error', 'Sai email hoặc mật khẩu')
                }
            } else {
                Alert.alert('Error', 'Người dùng không tồn tại')
            }
        }, 2000)
    }
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))
    }
    const handleError = (errorMess, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMess }))
    }
    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
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
