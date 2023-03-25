import httpClient from './../api/httpClient'

let actions = {
    refreshToken({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            httpClient.post('refresh')
                .then(res => {
                    resolve(res)
                    if (res.data.status) {
                        const token = res.data.data.authorisation.token
                        commit('token', { token })
                        commit('notification', { "status": "success", "message": res.data.message })
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    login({ commit }, { user, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.post('login', user)
                .then(res => {
                    resolve(res)
                    if (res.data.status) {
                        const token = res.data.data.authorisation.token
                        const user = res.data.data.user
                        commit('auth', { token, user })
                        commit('notification', { "status": "success", "message": res.data.message })
                        callback()
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    logout({ commit }, { callback }) {
        commit('logout')
        delete httpClient.defaults.headers.common['Authorization']
        commit('notification', { "status": "success", "message": "Logout Successful" })
        callback()
        // return new Promise((resolve, reject) => {
        //     httpClient.post('/logout')
        //         .then(res => {
        //             resolve(res)
        //             if (res.data.status) {
        //                 commit('notification', { "status": "success", "message": res.data.message })
        //                 callback()
        //             } else {
        //                 commit('notification', { "status": "error", "message": res.data.message })
        //             }
        //         }).catch(err => {
        //             commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
        //             reject(err)
        //         })
        // })
    },
    createMovie({ commit }, { movie, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.post('/movies', movie)
                .then(res => {
                    resolve(res)
                    if (res.data.status) {
                        commit('notification', { "status": "success", "message": res.data.message })
                        callback()
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    updateMovie({ commit }, { id, movie, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.put(`/movies/${id}`, movie)
                .then(res => {
                    resolve(res)
                    if (res.data.status) {
                        commit('notification', { "status": "success", "message": res.data.message })
                        callback()
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    fetchMovies({ commit }, { current_page, per_page, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/movies?page=${current_page}&per_page=${per_page}`)
                .then(res => {
                    resolve(res)
                    res.data.status ?
                        callback(res.data)
                        : commit('notification', { "status": "error", "message": res.data.message })
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    searchMovies({ commit }, { query, current_page, per_page, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/search-movies?q=${query}&page=${current_page}&per_page=${per_page}`)
                .then(res => {
                    resolve(res)
                    res.data.status ?
                        callback(res.data)
                        : commit('notification', { "status": "error", "message": res.data.message })
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    fetchMovieDetails({ commit }, { id, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/movies/${id}`)
                .then(res => {
                    resolve(res)
                    res.data.status ?
                        callback(res.data)
                        : commit('notification', { "status": "error", "message": res.data.message })
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    deleteMovie({ commit }, { id, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.delete(`/movies/${id}`)
                .then(res => {
                    resolve(res)
                    if (res.data.status) {
                        commit('notification', { "status": "success", "message": res.data.message })
                        callback(id)
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
}

export default actions