import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { RESET_PASS, USER_KEY, VERIFY_TYPE, VERIFY } from '../constants/base'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
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
import { storeAsString, storeObjectOrArray } from '../utils/store'
import { verifyReset } from '../rest/api/auth'

const ResetPass = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    })
    const inputFields = [
        {
            icon: 'lock',
            placeholder: 'Mật khẩu mới',
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
        { field: 'password', message: 'Mật khẩu phải trên 5 kí tự', minLength: 5 },
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
            handleReset()
        }
    }
    const clearInput = () => {
        setInputs({
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        })
    }
    const handleReset = () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            try {
                await storeAsString(VERIFY_TYPE, 'reset')
                await storeAsString(RESET_PASS, inputs.confirmPassword)
                const verifyCode = await verifyReset()
                console.log(verifyCode.data.data)
                await storeAsString(VERIFY, verifyCode.data.data)
                clearInput()
                navigation.navigate('Verify')
            } catch (error) {
                console.log(error)
                Alert.alert('Error', 'Có lỗi xảy ra')
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
                <Text style={styles.headerText}>Thay đổi mật khẩu</Text>
                <View style={{ marginVertical: 10 }}>{renderInputs()}</View>
                <Button
                    title="Xác Nhận"
                    colorFrom={COLORS.primary}
                    colorTo={COLORS.secondary}
                    textColor={COLORS.white}
                    onPress={validate}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResetPass

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    headerText: {
        color: COLORS.secondary,
        textTransform: 'uppercase',
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
})
