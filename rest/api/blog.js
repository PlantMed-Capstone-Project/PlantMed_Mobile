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

export const like = async (id) => {
    return http.post(`blogs/like?id=${id}`)
}

export const unlike = async (id) => {
    return http.delete(`blogs/unlike?id=${id}`)
}
