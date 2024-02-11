import Button from '../components/Button'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { uploadImage, renderModal } from '../components/ImageHandle'
import { useState } from 'react'
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
const height = Dimensions.get('window').height / 3

const Predict = () => {
    const [openModal, setOpenModal] = useState(false)
    const [image, setImage] = useState(null)

    const predictResult = async image => {
        setImage(image.assets[0].base64)
        setOpenModal(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderModal(openModal, setOpenModal, uploadImage, predictResult)}
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
                        source={{ uri: `data:image/png;base64,${image}` }}
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
