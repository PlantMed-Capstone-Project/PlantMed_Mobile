import { useNavigation } from '@react-navigation/native'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { clearStorage, readStorage } from '../utils/store'
import { ACCESS_TOKEN, USER_KEY } from '../constants/base'
import { useEffect, useState } from 'react'

const Profile = () => {
    const navigation = useNavigation()
    const [userDetail, setUserDetail] = useState('')

    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = async () => {
        try {
            let userData = await readStorage(USER_KEY)
            if (userData) {
                setUserDetail(userData)
            }
            console.log(userDetail)
        } catch (error) {

        }
    }
    const contactInfo = [
        {
            icon: 'email-outline',
            label: 'Email',
            value: userDetail.email,
        },
        {
            icon: 'phone-outline',
            label: 'Phone',
            value: userDetail.phone
        },
        {
            icon: 'card-account-details-outline',
            label: 'CCCD',
            value: userDetail.cccd
        },
    ]

    const handleLogout = () => {
        clearStorage(USER_KEY)
        clearStorage(ACCESS_TOKEN)
        navigation.navigate('Welcome')
    }

    const renderContactInfo = () => {
        return contactInfo.map((info, index) => (
            <View key={index} style={styles.info}>
                <Icon name={info.icon} size={30} color={COLORS.primary} />
                <Text style={{ marginLeft: 10 }}>{info.label}</Text>
                <Text style={{ textAlign: 'right', flex: 1 }}>
                    {info.value}
                </Text>
            </View>
        ))
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingTop: 50 }}>
                <Text style={styles.myProfile}>Hồ sơ của bạn</Text>
                <View
                    style={{
                        marginTop: 50,
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_mp8VzZ-J9ZiXn6f4vNmU1BlX0D7YzrFhag&usqp=CAU',
                        }}
                    />
                    <View style={styles.bgImageIcon}>
                        <Icon
                            name="camera-outline"
                            size={30}
                            color={COLORS.secondary}
                        />
                    </View>
                </View>
                <Text style={styles.textName}>Dĩm My</Text>
            </View>
            <View style={styles.personInfo}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}>
                    <Text style={{ fontSize: SIZES.base, fontWeight: 'bold' }}>
                        Thông tin cá nhân
                    </Text>
                    <Text style={{ color: COLORS.gray }}>Sửa</Text>
                </View>

                {renderContactInfo()}
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: SIZES.base, fontWeight: 'bold' }}>
                        Tiện ích
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.info}
                    activeOpacity={0.8}
                //onPress={handleLogout}
                >
                    <Icon name="cog" size={30} color={COLORS.primary} />
                    <Text style={{ marginLeft: 10 }}>Thay đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.info}
                    activeOpacity={0.8}
                    onPress={handleLogout}>
                    <Icon name="logout" size={30} color={COLORS.primary} />
                    <Text style={{ marginLeft: 10 }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        paddingHorizontal: 20,
    },
    myProfile: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textName: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    bgImageIcon: {
        backgroundColor: COLORS.light,
        position: 'absolute',
        bottom: 0,
        right: 125,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    personInfo: {
        marginTop: 20,
    },
    info: {
        paddingHorizontal: 20,
        marginTop: 5,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLORS.gray2,
        height: 50,
        alignItems: 'center',
    },
})

export default Profile
