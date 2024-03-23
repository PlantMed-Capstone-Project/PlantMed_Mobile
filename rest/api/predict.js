import { PREDICT_URL } from '../../constants/base'
import Client from '../baseClient'

const http = new Client(PREDICT_URL)

export const predict = async payload => {
    return http.post('/predict/yolo', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}
