import unorm from 'unorm'
import { Buffer } from 'buffer'

/**
 * For API setup
 * @param {*} obj
 * @returns
 */
export function objectToFormData(obj) {
    const formData = new FormData()

    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value)
    })

    return formData
}

export const normalizeAndUpper = input => {
    return unorm
        .nfd(input)
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
}

export const parseJwt = token => {
    return token
        ? JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        : ''
}

export const imageToBase64 = (file, callback) => {
    let xhr = new XMLHttpRequest()
    xhr.onload = function () {
        let reader = new FileReader()
        reader.onloadend = function () {
            callback(reader.result.split(',')[1])
        }
        reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', file)
    xhr.responseType = 'blob'
    xhr.send()
}
