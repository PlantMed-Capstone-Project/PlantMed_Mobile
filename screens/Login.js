import { View, Text, SafeAreaView, StyleSheet, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../const/colors'
import SIZES from '../const/fontsize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../components/Button'
import Loader from '../components/Loader'

const Login = ({ navigation }) => {
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
        }
        if (!inputs.password) {
            handleError("Vui lòng nhập mật khẩu", "password");
            valid = false;
        }

        if (valid) {
            login();
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
    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem("user");
            console.log(userData);
            if (userData) {
                userData = JSON.parse(userData);
                if (inputs.email == userData.email && inputs.password == userData.password) {
                    AsyncStorage.setItem("user", JSON.stringify({ ...userData, loggedIn: true }));
                    clearInput();
                    navigation.navigate("Welcome");
                } else {
                    Alert.alert("Error", "Sai email hoặc mật khẩu")
                }
            } else {
                Alert.alert("Error", "Người dùng không tồn tại");
            }

        }, 2000);

    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }))
    };
    const handleError = (errorMess, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMess }))
    }
    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 30,
            }}>
                <Icon name="arrow-left" style={{ fontSize: SIZES.icon, marginBottom: 50, color: COLORS.secondary }} onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>
                    Đăng nhập
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        icon="account"
                        placeholder="Email"
                        onChangeText={text => handleOnChange(text, "email")}
                        onFocus={() => { handleError(null, "email") }}
                        error={errors.email}
                        value={inputs.email}
                    />
                    <Input
                        icon="lock"
                        placeholder="Mật khẩu"
                        password
                        onChangeText={text => handleOnChange(text, "password")}
                        onFocus={() => { handleError(null, "password") }}
                        error={errors.password}
                        value={inputs.password}
                    />
                </View>
                <Button title="Đăng nhập" colorFrom={COLORS.primary} colorTo={COLORS.secondary} textColor={COLORS.white} onPress={validate} />
                <Text style={{ marginTop: 15, textAlign: 'center', color: COLORS.primary }}
                    onPress={() => navigation.navigate("SignUp")}>
                    Bạn chưa có tài khoản? Đăng ký
                </Text>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Login

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
        textAlign: 'center'
    }
})