import Client from 'rest/baseClient'

const http = new Client('api for predict')

export const predict = (payload) => {
  return http.postForm('predict', payload)
}

export const testUpload = (payload) => {
  return http.postForm('upload', payload)
}