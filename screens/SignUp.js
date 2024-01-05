import { View, Text, SafeAreaView, StyleSheet, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../const/colors'
import SIZES from '../const/fontsize'
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
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError("Vui lòng nhập email", "email");
            valid = false;
        } else if (!inputs.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            handleError("Vui lòng nhập đúng định dạng email", "email");
            valid = false;
        }

        if (!inputs.cccd) {
            handleError("Vui lòng nhập CCCD", "cccd");
            valid = false;
        }
        if (!inputs.phone) {
            handleError("Vui lòng nhập số điện thoại", "phone");
            valid = false;
        }
        if (!inputs.password) {
            handleError("Vui lòng nhập mật khẩu", "password");
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError("Độ dài mật khẩu phải lớn hơn 5", "password");
            valid = false;
        }
        if (inputs.password !== inputs.confirmPassword || !inputs.confirmPassword) {
            handleError("Mật khẩu xác thực không đúng", "confirmPassword");
            valid = false;
        }

        if (valid) {
            register();
        }
    };
    const register = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);

            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs));
                navigation.navigate("Login");
            } catch (error) {
                Alert.alert("Error", "Something went wrong");
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
                    <Input
                        icon="account"
                        placeholder="Email"
                        onChangeText={text => handleOnChange(text, "email")}
                        onFocus={() => { handleError(null, "email") }}
                        error={errors.email}
                    />
                    <Input
                        keyboardType='numeric'
                        icon="card-account-details"
                        placeholder="CCCD"
                        onChangeText={text => handleOnChange(text, "cccd")}
                        onFocus={() => { handleError(null, "cccd") }}
                        error={errors.cccd}
                    />
                    <Input
                        keyboardType='numeric'
                        icon="cellphone"
                        placeholder="Số điện thoại"
                        onChangeText={text => handleOnChange(text, "phone")}
                        onFocus={() => { handleError(null, "phone") }}
                        error={errors.phone}
                    />
                    <Input
                        icon="lock"
                        placeholder="Mật khẩu"
                        password
                        onChangeText={text => handleOnChange(text, "password")}
                        onFocus={() => { handleError(null, "password") }}
                        error={errors.password}
                    />
                    <Input
                        icon="lock"
                        placeholder="Xác thực mật khẩu"
                        password
                        onChangeText={text => handleOnChange(text, "confirmPassword")}
                        onFocus={() => { handleError(null, "confirmPassword") }}
                        error={errors.confirmPassword}
                    />
                </View>
                <Button title="Đăng ký" colorFrom={COLORS.primary} colorTo={COLORS.secondary} textColor={COLORS.white} url="Welcome" onPress={validate} />
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