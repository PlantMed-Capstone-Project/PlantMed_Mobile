import { View, Text, SafeAreaView, StyleSheet, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../components/Button'
import Loader from '../components/Loader'

const SignUp = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        email: '',
        cccd: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const inputFields = [
        { icon: "account", placeholder: "Email", key: "email", keyboardType: 'default' },
        { icon: "card-account-details", placeholder: "CCCD", key: "cccd", keyboardType: 'numeric' },
        { icon: "cellphone", placeholder: "Số điện thoại", key: "phone", keyboardType: 'numeric' },
        { icon: "lock", placeholder: "Mật khẩu", key: "password", password: true },
        { icon: "lock", placeholder: "Xác thực mật khẩu", key: "confirmPassword", password: true },
    ];
    const validationRules = [
        { field: 'email', message: 'Vui lòng nhập đúng định dạng email', regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        { field: 'email', message: 'Vui lòng nhập email' },
        { field: 'cccd', message: 'Vui lòng nhập CCCD' },
        { field: 'phone', message: 'Vui lòng nhập số điện thoại' },
        { field: 'password', message: 'Vui lòng nhập mật khẩu', minLength: 5 },
        { field: 'confirmPassword', message: 'Mật khẩu xác thực không đúng', compareField: 'password' },
    ];

    const renderInputs = () => {
        return inputFields.map(({ icon, placeholder, key, keyboardType, password }) => (
            <Input
                key={key}
                icon={icon}
                placeholder={placeholder}
                keyboardType={keyboardType}
                password={password}
                onChangeText={(text) => handleOnChange(text, key)}
                onFocus={() => handleError(null, key)}
                error={errors[key]}
                value={inputs[key]}
            />
        ));
    };
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        validationRules.forEach(({ field, message, regex, minLength, compareField }) => {
            if (!inputs[field] || (regex && !inputs[field].match(regex)) || (minLength && inputs[field].length < minLength) || (compareField && inputs[field] !== inputs[compareField])) {
                handleError(message, field);
                valid = false;
            }
        });

        if (valid) {
            register();
        }
    };
    const clearInput = () => {
        setInputs({
            email: '',
            cccd: '',
            phone: '',
            password: '',
            confirmPassword: ''
        });
    }
    const register = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                clearInput();
                navigation.navigate("Login");
            } catch (error) {
                Alert.alert("Error", "Có lỗi xảy ra");
            }
        }, 2000);

    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };
    const handleError = (errorMess, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMess }))
    }
    //console.log(inputs)
    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 30,
            }}>
                <Icon name="arrow-left" style={{ fontSize: SIZES.icon, marginBottom: 50, color: COLORS.secondary }} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>
                    Đăng ký
                </Text>
                <View style={{ marginVertical: 20 }}>
                    {renderInputs()}
                </View>
                <Button title="Đăng ký" colorFrom={COLORS.primary} colorTo={COLORS.secondary} textColor={COLORS.white} onPress={validate} />
                <Text style={{ marginTop: 15, textAlign: 'center', color: COLORS.primary }}
                    onPress={() => navigation.navigate("Login")}>
                    Bạn đã có tài khoản? Đăng nhập
                </Text>
            </ScrollView>
        </SafeAreaView >
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    headerText: {
        color: COLORS.secondary,
        textTransform: 'uppercase',
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})