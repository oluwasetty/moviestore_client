import httpClient from './../api/httpClient'

let actions = {
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
            const q = query.toLowerCase()
            httpClient.get(`itemSearch?search=${q}`)
                .then(res => {
                    resolve(res)
                    if (res.status == 200) {
                        callback(res.data)
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    loadMatches({ commit }, { first_id, second_id, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.get(`getOverlap?ids=${first_id},${second_id}`)
                .then(res => {
                    resolve(res)
                    if (res.status == 200) {
                        callback(res.data)
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },
    getCharacterImage({ commit }, { link, callback }) {
        return new Promise((resolve, reject) => {
            httpClient.get(`getCharacterPhoto?link=${link}`)
                .then(res => {
                    resolve(res)
                    if (res.status == 200) {
                        callback(res.data)
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