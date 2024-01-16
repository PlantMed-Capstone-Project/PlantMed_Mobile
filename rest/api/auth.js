import Client from 'rest/baseClient'

const http = new Client()

export const login = (payload) => {
  return http.post('auth/signIn', payload)
}

export const register = (payload) => {
  return http.post('auth/signUp', payload)
}