import Client from '../baseClient'

const http = new Client()

export const login = async payload => {
    return http.post('/auth/login', payload)
}

export const register = async payload => {
    return http.post('/auth/register', payload)
}

export const refreshToken = async payload => {
    return http.post('/auth/refresh', payload)
}

export const logout = async () => {
    return http.delete('/auth/revokeToken')
}

export const verify = async (payload) => {
    return http.post('/auth/verify', payload)
}
