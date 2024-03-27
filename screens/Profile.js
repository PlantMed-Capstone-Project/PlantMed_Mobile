import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { renderModal, uploadImage } from '../components/ImageHandle'
import { ACCESS_TOKEN, USER_KEY } from '../constants/base'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { clearStorage, readStorage } from '../utils/store'
import { parseImg } from '../utils/index'
import { getAvatar, updateAvatar } from '../rest/api/user'

const Profile = () => {
    const [openModal, setOpenModal] = useState(false)
    const [image, setImage] = useState(null)

    const predictResult = async image => {
        setImage(image.assets[0].base64)
        hanldeUpdateAvatar(image.assets[0].base64)
        setOpenModal(false)
    }

    async function fetchAvatar() {
        try {
            const avatar = await getAvatar()
            setImage(avatar.data)
        } catch (error) {
            alert(error)
        }
    }

    async function hanldeUpdateAvatar(image) {
        try {
            await updateAvatar(image)
        } catch (error) {
            console.log(error)
        }
    }

    const navigation = useNavigation()
    const [userDetail, setUserDetail] = useState('')


    const getUserDetail = async () => {
        try {
            let userData = await readStorage(USER_KEY)
            if (userData) {
                setUserDetail(userData)
            }
            //console.log(userDetail)
        } catch (error) { }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    useEffect(() => {
        fetchAvatar()
    }, [])
    const contactInfo = [
        {
            icon: 'email-outline',
            label: 'Email',
            value: userDetail.Email,
        },
        {
            icon: 'card-account-details-outline',
            label: 'Họ tên',
            value: userDetail.FullName,
        },
    ]

    const handleLogout = async () => {
        await clearStorage(USER_KEY)
        await clearStorage(ACCESS_TOKEN)
        navigation.replace('Tutorial')
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
        <View style={styles.container}>
            {renderModal(openModal, setOpenModal, uploadImage, predictResult)}
            <View style={{ paddingTop: 50 }}>
                <Text style={styles.myProfile}>Hồ sơ của bạn</Text>
                <View
                    style={{
                        marginTop: 50,
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                    {image ? (<>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{
                                uri: image && parseImg(image)
                            }}
                        />
                        <View style={styles.bgImageIcon}>
                            <TouchableOpacity onPress={() => setOpenModal(true)}>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color={COLORS.secondary}
                                />
                            </TouchableOpacity>
                        </View></>) : (
                        <ActivityIndicator size='large' />
                    )}

                </View>
                <Text style={styles.textName}>{userDetail.FullName}</Text>
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
                    onPress={() => navigation.navigate('ResetPass')}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

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
