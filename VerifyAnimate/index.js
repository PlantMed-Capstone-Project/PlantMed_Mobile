import { Alert, Animated, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from './style';
import Button from '../components/Button';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { clearStorage, readStorage, readStorageAsString } from '../utils/store';
import { RESET_PASS, USER_KEY, VERIFY, VERIFY_TYPE } from '../constants/base';
import { register, resetPassword, verifyReset } from '../rest/api/auth';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
    uri:
        'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const VerifyAimate = () => {
    const navigation = useNavigation()
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const checkValidate = async () => {
        if (value.length !== 4) {
            showError("Vui lòng nhập đầy đủ mã xác minh")
        } else {
            const verifyCode = await readStorageAsString(VERIFY)
            verifyCode == value ? handleVerify() : showError("Bạn đã nhập sai mã xác nhận, vui lòng nhập lại")
        }
    }

    const showError = (message) => {
        Alert.alert("Lỗi", message)
        clearInput();
    };

    const handleVerify = async () => {
        const userData = await readStorage(USER_KEY)
        const type = await readStorageAsString(VERIFY_TYPE)
        try {
            userData.role = 'user'
            if (type == "signup") {
                const data = await register(userData)
                if (data.status == 200) {
                    clearStorage(VERIFY)
                    navigation.navigate("Login")
                }
            } else {
                const reset_pass = await readStorageAsString(RESET_PASS)
                const data = await resetPassword({
                    "newPassword": reset_pass
                })
                if (data.status == 200) {
                    clearStorage(RESET_PASS)
                    clearStorage(VERIFY)
                    navigation.navigate("Profile")
                }
            }

        } catch (error) {
            console.log(error)
        }
    };

    const clearInput = () => {
        setValue('')
    }

    const reSendCode = () => {

    }

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    return (
        <SafeAreaView style={styles.root}>
            <Icon
                name="arrow-left"
                size={30}
                onPress={() => navigation.goBack()}
                style={{ marginBottom: 30 }}
            />
            <Text style={styles.title}>Xác minh</Text>
            <Image style={styles.icon} source={source} />
            <Text style={styles.subTitle}>
                Vui lòng nhập mã xác minh mà{'\n'}
                chúng tôi đã gửi đến địa chỉ email của bạn
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
            <View style={{ marginTop: 20 }}>
                <Button colorFrom={COLORS.primary} colorTo={COLORS.secondary} textColor={COLORS.white} title="Xác Nhận" onPress={checkValidate} />
            </View>
            <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={reSendCode}>
                <Text style={{ textDecorationLine: 'underline', color: COLORS.blue }}>Bạn không nhận được mã? Gửi lại</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default VerifyAimate;