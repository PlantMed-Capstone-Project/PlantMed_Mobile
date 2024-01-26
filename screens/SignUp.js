import { useState } from 'react'
import {
    Alert,
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
import { USER_KEY, VERIFY } from '../constants/base'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { verify } from '../rest/api/auth'
import { storeAsString, storeObjectOrArray } from '../utils/store'

const SignUp = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    })
    const inputFields = [
        {
            icon: 'account',
            placeholder: 'Email',
            key: 'email',
            keyboardType: 'default',
        },
        {
            icon: 'card-account-details',
            placeholder: 'Họ tên',
            key: 'fullName',
            keyboardType: 'default',
        },
        {
            icon: 'lock',
            placeholder: 'Mật khẩu',
            key: 'password',
            password: true,
        },
        {
            icon: 'lock',
            placeholder: 'Xác thực mật khẩu',
            key: 'confirmPassword',
            password: true,
        },
    ]
    const validationRules = [
        {
            field: 'email',
            message: 'Vui lòng nhập đúng định dạng email',
            regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        { field: 'email', message: 'Vui lòng nhập email' },
        { field: 'fullName', message: 'Vui lòng nhập họ tên' },
        {
            field: 'password',
            message: 'Mật khẩu phải trên 5 kí tự',
            minLength: 5,
        },
        {
            field: 'confirmPassword',
            message: 'Mật khẩu xác thực không đúng',
            compareField: 'password',
        },
    ]

    const renderInputs = () => {
        return inputFields.map(
            ({ icon, placeholder, key, keyboardType, password }) => (
                <Input
                    key={key}
                    icon={icon}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    password={password}
                    onChangeText={text => handleOnChange(text, key)}
                    onFocus={() => handleError(null, key)}
                    error={errors[key]}
                    value={inputs[key]}
                />
            ),
        )
    }
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const validate = () => {
        Keyboard.dismiss()
        let valid = true
        validationRules.forEach(
            ({ field, message, regex, minLength, compareField }) => {
                if (
                    !inputs[field] ||
                    (regex && !inputs[field].match(regex)) ||
                    (minLength && inputs[field].length < minLength) ||
                    (compareField && inputs[field] !== inputs[compareField])
                ) {
                    handleError(message, field)
                    valid = false
                }
            },
        )

        if (valid) {
            handleRegister()
        }
    }
    const clearInput = () => {
        setInputs({
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
            role: '',
        })
    }
    const handleRegister = () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            try {
                await storeObjectOrArray(USER_KEY, inputs)

                const verifyCode = await verify({
                    email: inputs.email,
                })
                await storeAsString(VERIFY, verifyCode.data.data)
                clearInput()
                navigation.navigate('Verify')
            } catch ({ response }) {
                Alert.alert('Error', response.data.message)

                //console.log('error signup', error.response.data)
                console.log('error signup', response.data)
                console.log('error signup', response.data.message)
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
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 50,
                    paddingHorizontal: 30,
                }}>
                <Icon
                    name="arrow-left"
                    style={{
                        fontSize: SIZES.icon,
                        marginBottom: 50,
                        color: COLORS.secondary,
                    }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerText}>Đăng ký</Text>
                <View style={{ marginVertical: 10 }}>{renderInputs()}</View>
                <Button
                    title="Đăng ký"
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
                    onPress={() => navigation.navigate('Login')}>
                    Bạn đã có tài khoản? Đăng nhập
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    headerText: {
        color: COLORS.secondary,
        textTransform: 'uppercase',
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
