import { useState } from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native'
import Button from '../components/Button'
import { renderModal, uploadImage } from '../components/ImageHandle'
import COLORS from '../constants/colors'
import SIZES from '../constants/fontsize'
import { predict } from '../rest/api/predict'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Loader'
import LoadingPredict from '../components/LoadingPredict'

const height = Dimensions.get('window').height / 3

const Predict = () => {
    const navigation = useNavigation()
    const [openModal, setOpenModal] = useState(false)
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const predictResult = async image => {
        setImage(image.assets[0].base64)
        let formdata = new FormData()
        formdata.append("file", { uri: image.assets[0].uri, name: 'image.jpg', type: 'image/jpeg' })
        try {
            setIsLoading(true)
            setOpenModal(false)
            const res = await predict(formdata)
            const predictData = { ...res.data.plant, "image": image.assets[0].base64, "accuracy": res.data.accuracy }
            setIsLoading(false)
            navigation.navigate("Detail", predictData)
        } catch (error) {
            setIsLoading(false)
            Alert.alert("Lỗi tìm kiếm", "Không nhận diện được ảnh")
        }
        setOpenModal(false)
    }

    return (
        <View style={styles.container}>
            {isLoading && <LoadingPredict />}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        padding: 20,
        flex: 1,
    },
})
export default Predict
