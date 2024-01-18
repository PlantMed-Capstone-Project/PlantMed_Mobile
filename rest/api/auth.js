import Client from '../baseClient'

const http = new Client()

export const login = async payload => {
    return http.post('/auth/signIn', payload)
}

export const register = async payload => {
    return http.post('/auth/signUp', payload)
}

export const refreshToken = async payload => {
    return http.post('/auth/refreshToken', payload)
}

export const logout = async () => {
    return http.delete('/auth/revokeToken')
}
