import Client from '../baseClient'

const http = new Client()

export const updateProfile = async payload => {
    return http.postForm('/users', payload)
}

export const getProfile = async id => {
    return http.get('/users/:id', id)
}

export const getAvatar = async () => {
    return http.get('/users/getAvatar')
}

export const updateAvatar = async (payload) => {
    return http.patch('/users/updateImage', payload)
}