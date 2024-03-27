import { View, Modal } from 'react-native';
import Button from './Button';
import COLORS from '../constants/colors';
import * as ImagePicker from 'expo-image-picker'

export const uploadImage = async (mode, setOpenModal, predictResult) => {
    try {
        let result = {};
        const { status } =
            mode === 'gallery'
                ? await ImagePicker.requestMediaLibraryPermissionsAsync()
                : await ImagePicker.requestCameraPermissionsAsync();
        const permissionsGranted = status === 'granted';

        if (!permissionsGranted) {
            alert('Vui lòng bật quyền truy cập trong cài đặt');
        } else {
            result =
                mode === 'gallery'
                    ? await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                        base64: true,
                    })
                    : await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.back,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                        base64: true,
                    });
            if (!result.canceled) {
                await predictResult(result);
            }
        }
    } catch (error) {
        alert('Error uploading image: ' + error.message);
        setOpenModal(false);
    }
};

export const renderModal = (openModal, setOpenModal, uploadImage, predictResult) => {
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
                                onPress={() => uploadImage('gallery', setOpenModal, predictResult)}
                            />
                            <Button
                                title="Camera"
                                colorFrom={COLORS.primary}
                                colorTo={COLORS.secondary}
                                textColor={COLORS.white}
                                onPress={() => uploadImage(undefined, setOpenModal, predictResult)}
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
    );
};
