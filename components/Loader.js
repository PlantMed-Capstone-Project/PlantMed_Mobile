import { View, Text, StyleSheet, useWindowDimensions, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'


const Loader = ({ visible = false }) => {
    return (
        visible && (
            <View style={[styles.container, Dimensions.get('screen')]}>
                <View style={styles.loader}>
                    <ActivityIndicator size='large' color={COLORS.primary} />
                    <Text style={{ marginLeft: 20, fontSize: SIZES.base, fontWeight: '500' }}>Đang tải...</Text>
                </View>
            </View >
        )
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        height: '100%'
    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        marginHorizontal: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});

export default Loader