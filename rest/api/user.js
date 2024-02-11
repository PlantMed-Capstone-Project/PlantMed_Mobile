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
