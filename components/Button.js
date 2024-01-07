import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const Button = ({ title, colorFrom, colorTo, textColor, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.btn, styles.btnPrimary]} onPress={onPress}>
            <LinearGradient
                colors={[colorFrom, colorTo]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
                <Text style={[styles.btnText, { color: textColor, textTransform: 'uppercase' }]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: '100%',
        borderRadius: SIZES.radius,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    btnPrimary: {
        backgroundColor: COLORS.secondary,
        elevation: 3
    },
    btnShadow: {
        backgroundColor: COLORS.white,
        elevation: 4,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20
    },
    btnText: {
        fontWeight: '600',
        fontSize: SIZES.base,
        textAlign: 'center',
    },
    linearGradient: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        borderRadius: 10
    },

});

export default Button