import Client from '../baseClient'

const http = new Client()

export const updateProfile = async payload => {
    return http.postForm('/user', payload)
}

export const getProfile = async id => {
    return http.get('/user/:id', id)
}
