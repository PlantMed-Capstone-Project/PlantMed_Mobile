import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { lazy } from 'react'
import COLORS from '../const/colors'
import SIZES from '../const/fontsize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'

const Input = ({
    icon,
    error,
    password,
    onFocus = () => { },
    ...props }) => {

    const [isFocus, setIsFocus] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return (
        <View style={{ marginVertical: 15 }}>
            <View style={[styles.inputContainer, {
                borderColor: error ? COLORS.red : isFocus ? COLORS.primary : COLORS.light
            }]}>
                <Icon name={icon} style={{ fontSize: SIZES.icon, color: COLORS.primary, marginRight: 10 }} />
                <TextInput {...props} style={{ color: COLORS.primary, flex: 1 }}
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    onFocus={() => {
                        onFocus();
                        setIsFocus(true);
                    }}
                    onBlur={() => {
                        setIsFocus(false);
                    }}
                />
                {password && (
                    <Icon name={hidePassword ? "eye" : "eye-off"}
                        style={{ fontSize: SIZES.icon, color: COLORS.primary }}
                        onPress={() => { setHidePassword(!hidePassword) }}
                    />
                )}
            </View>
            {error && (
                <Text style={{ color: COLORS.red, marginTop: 7, fontSize: SIZES.error }}>{error}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 55,
        backgroundColor: COLORS.lightgreen,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
    }
})

export default Input