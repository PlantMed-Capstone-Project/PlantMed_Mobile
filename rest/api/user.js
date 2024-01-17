import Client from 'rest/baseClient'

const http = new Client()

export const updateProfile = (payload) => {
  return http.postForm('user', payload)
}