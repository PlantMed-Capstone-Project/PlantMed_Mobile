import Client from '../baseClient'

const http = new Client()

export const getActiveBlog = async () => {
    return http.get('blogs')
}

export const getByUser = async () => {
    return http.get('blogs/user')
}

export const getIdBlog = async (id) => {
    return http.get(`blogs/${id}`)
}

