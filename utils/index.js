import unorm from 'unorm'

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
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
