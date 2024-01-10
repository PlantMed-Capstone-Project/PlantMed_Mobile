import React, { useState } from 'react'
import { Dimensions, Modal, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import Button from '../components/Button'
import COLOS from '../constants/colors'
import SIZES from '../constants/fontsize'
import * as ImagePicker from 'expo-image-picker'
const height = Dimensions.get('window').height / 3;

const Predict = () => {
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState(null);
    const uploadImage = async (mode) => {
        try {
            let result = {};
            let permissionsGranted = false;

            if (mode === "gallery") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                permissionsGranted = status === 'granted';

                if (!permissionsGranted) {
                    alert("Vui lòng bật quyền truy cập trong cài đặt");
                }
            } else {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                permissionsGranted = status === 'granted';

                if (!permissionsGranted) {
                    alert("Vui lòng bật quyền truy cập trong cài đặt");
                }
            }

            if (permissionsGranted) {
                result = mode === "gallery"
                    ? await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                    : await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });

                if (!result.canceled) {
                    await predictResult(result.assets[0].uri);
                }
            }
        } catch (error) {
            alert("Error uploading image: " + error.message);
            setOpenModal(false);
        }
    };


    const predictResult = async (image) => {
        try {
            setImage(image);
            setOpenModal(false);
        } catch (error) {

        }
    }

    function renderModal() {
        return (
            <Modal visible={openModal} animationType='slide' transparent={true} statusBarTranslucent={true}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: "100%", backgroundColor: COLOS.white, justifyContent: 'flex-end', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 2, borderColor: COLOS.primary }}>
                        <View style={{ paddingHorizontal: 30, marginBottom: 30, paddingTop: 30 }}>
                            <View>
                                <Button title="Photo gallery" colorFrom={COLOS.primary} colorTo={COLOS.secondary} textColor={COLOS.white} onPress={() => uploadImage("gallery")} />
                                <Button title="Camera" colorFrom={COLOS.primary} colorTo={COLOS.secondary} textColor={COLOS.white} onPress={() => uploadImage()} />
                            </View>
                            <Button title="Hủy bỏ" colorFrom={COLOS.white} colorTo={COLOS.light} textColor={COLOS.gray} onPress={() => setOpenModal(false)} />
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
                <Text style={{ textAlign: 'center', fontSize: SIZES.title, fontWeight: 'bold' }}>Phát hiện hình ảnh</Text>
            </View>
            <View style={{ marginTop: 120 }}>
                <View style={{ backgroundColor: COLOS.gray, width: "100%", height }}>
                    <Image style={{ height: "100%", width: "100%" }} source={{ uri: image }} />
                </View>
                <Button title="Tải ảnh lên" colorFrom={COLOS.primary} colorTo={COLOS.secondary} textColor={COLOS.white} onPress={() => setOpenModal(true)} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: COLOS.white,
        flex: 1
    },
})
export default Predict