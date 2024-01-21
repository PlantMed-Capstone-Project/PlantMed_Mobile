import Button from '../components/Button'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import {
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
const height = Dimensions.get('window').height / 3

const Predict = () => {
    const [openModal, setOpenModal] = useState(false)
    const [image, setImage] = useState(null)
    const uploadImage = async mode => {
        try {
            let result = {}
            const { status } =
                mode === 'gallery'
                    ? await ImagePicker.requestMediaLibraryPermissionsAsync()
                    : await ImagePicker.requestCameraPermissionsAsync()
            const permissionsGranted = status === 'granted'

            if (!permissionsGranted) {
                alert('Vui lòng bật quyền truy cập trong cài đặt')
            } else {
                result =
                    mode === 'gallery'
                        ? await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 1,
                        })
                        : await ImagePicker.launchCameraAsync({
                            cameraType: ImagePicker.CameraType.back,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 1,
                        })

                if (!result.canceled) {
                    await predictResult(result.assets[0].uri)
                }
            }
        } catch (error) {
            alert('Error uploading image: ' + error.message)
            setOpenModal(false)
        }
    }

    const predictResult = async image => {
        setImage(image)
        setOpenModal(false)
    }

    function renderModal() {
        return (
            <Modal
                visible={openModal}
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: COLORS.white,
                            justifyContent: 'flex-end',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                        }}>
                        <View
                            style={{
                                paddingHorizontal: 30,
                                marginBottom: 30,
                                paddingTop: 30,
                            }}>
                            <View>
                                <Button
                                    title="Photo gallery"
                                    colorFrom={COLORS.primary}
                                    colorTo={COLORS.secondary}
                                    textColor={COLORS.white}
                                    onPress={() => uploadImage('gallery')}
                                />
                                <Button
                                    title="Camera"
                                    colorFrom={COLORS.primary}
                                    colorTo={COLORS.secondary}
                                    textColor={COLORS.white}
                                    onPress={() => uploadImage()}
                                />
                            </View>
                            <Button
                                title="Hủy bỏ"
                                colorFrom={COLORS.white}
                                colorTo={COLORS.light}
                                textColor={COLORS.gray}
                                onPress={() => setOpenModal(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderModal()}
            <View style={{ paddingTop: 70 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: SIZES.title,
                        fontWeight: 'bold',
                    }}>
                    Phát hiện hình ảnh
                </Text>
            </View>
            <View style={{ marginTop: 120 }}>
                <View
                    style={{
                        backgroundColor: COLORS.gray,
                        width: '100%',
                        height,
                    }}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: image }}
                    />
                </View>
                <Button
                    title="Tải ảnh lên"
                    colorFrom={COLORS.primary}
                    colorTo={COLORS.secondary}
                    textColor={COLORS.white}
                    onPress={() => setOpenModal(true)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        flex: 1,
    },
})
export default Predict
