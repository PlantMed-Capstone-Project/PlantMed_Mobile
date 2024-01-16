import Client from 'rest/baseClient'

const http = new Client()

export const getAll = () => {
  return http.get('plants/all')
}

export const getById = (id) => {
  return http.get('plants/:id', id)
}

export const searchByName = (payload) => {
  return http.get('plants', payload)
}