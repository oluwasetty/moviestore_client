import httpClient from './../api/httpClient'
import axios from 'axios'
import cheerio from 'cheerio'

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
            const q = query.toLowerCase()
            axios.get(`https://v2.sg.media-imdb.com/suggestion/${q.substring(0, 1)}/${q}.json`)
                .then(res => {
                    resolve(res)
                    if (res.data.d) {
                        callback({
                            data: res.data.d.filter(item => item.id.indexOf('tt') !== -1).map(item => ({
                                id: item.id,
                                title: item.l,
                                type: item.q,
                                year: item.y,
                                image: item.i ? item.i.imageUrl.replace('.jpg', 'SY300.jpg') : undefined
                            }))
                        })
                    } else {
                        commit('notification', { "status": "error", "message": res.data.message })
                    }
                }).catch(err => {
                    commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
                    reject(err)
                })
        })
    },

    // searchMovies({ commit }, { query, current_page, per_page, callback }) {
    //     return new Promise((resolve, reject) => {
    //         const q = query.toLowerCase()
    //         httpClient.get(`itemSearch?search=${q}`)
    //             .then(res => {
    //                 resolve(res)
    //                 if (res.data.d) {
    //                     callback({
    //                         data: res.data.d.filter(item => item.id.indexOf('tt') !== -1).map(item => ({
    //                             id: item.id,
    //                             title: item.l,
    //                             type: item.q,
    //                             year: item.y,
    //                             image: item.i ? item.i.imageUrl.replace('.jpg', 'SY300.jpg') : undefined
    //                         }))
    //                     })
    //                 } else {
    //                     commit('notification', { "status": "error", "message": res.data.message })
    //                 }
    //             }).catch(err => {
    //                 commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
    //                 reject(err)
    //             })
    //     })
    // },
    async loadMatches({ commit }, { first_id, second_id, callback }) {
        // const result = await axios.get(`https://actor-overlap.azurewebsites.net/api/getOverlap?ids=${first_id},${second_id}`)
        // console.log(result)/
        // return new Promise((resolve, reject) => {
        //     // const q = query.toLowerCase()
        //     httpClient.get(`getOverlap?ids=${first_id},${second_id}`)
        //         .then(res => {
        //             resolve(res)
        //             if (res.data.d) {
        //                 callback({ data: res.data.d.filter(item => item.id.indexOf('tt') !== -1).map(item => ({ id: item.id,
        //                     title: item.l,
        //                     type: item.q,
        //                     year: item.y,
        //                     image: item.i ? item.i.imageUrl.replace('.jpg', 'SY300.jpg') : undefined })) })
        //             } else {
        //                 commit('notification', { "status": "error", "message": res.data.message })
        //             }
        //         }).catch(err => {
        //             commit('notification', { "status": "error", "message": err ?? err.response.data.message ?? err.message ?? "An error occurred" })
        //             reject(err)
        //         })
        // })

        console.log('Getting overlap from common')
        const result = await axios.get(`https://www.imdb.com/search/name/?roles=${first_id},${second_id}`)
        console.log('Done getting overlap')
        const $ = cheerio.load(result.data)
        let returnData = []
        const actorDataPromises = []
        $('.lister-item-header').each(async (i, el) => {
            const image = $(el).parent().prev().find('img').attr('src')
            const link = $(el).find('a')
            const name = link.text().trim()
            const id = link.attr('href').replace('/name/', '')

            actorDataPromises.push(axios.get(`https://www.imdb.com/name/${id}/`))
            returnData.push({
                name,
                id,
                image: image.indexOf('nopicture') !== -1 ? image.replace('.png', 'V1_SY200_CR38,0,150,200_AL_.png') : image,
                link: link.attr('href')
            })
        })

        console.log('loading both movie pages')
        let ids = [first_id, second_id]
        const promises = await Promise.all(ids.map(id => axios.get(`https://www.imdb.com/title/${id}/fullcredits?ref_=tt_cl_sm#cast`)))
        console.log('done loading both movie promies')
        promises.forEach((result, i) => {

            console.log('parsing movie' + i)
            const $show = cheerio.load(result.data)
            const showId = ids[i]
            //const tableRows = $show('.cast_list > tbody > tr').first().nextUntil('tr:not([class])')
            returnData = returnData.map(actor => {
                if (!actor) return undefined

                console.log('finding actor link')
                const actorLink = $show(`.cast_list a[href*="${actor.id}"]`)
                console.log('found actor link')

                const actorLinkRow = actorLink.parent().parent()
                if (!actorLink.length || (!actorLinkRow.hasClass('even') && !actorLinkRow.hasClass('odd'))) return undefined
                const actorName = actorLink.parent().parent().find('.character,.credit')
                actorName.find('a[class*="episodes"]').remove()
                let characterLinkEl = actorName.find('a[href*="characters"]').first()
                let characterName = characterLinkEl.text().trim()
                let characterLink = ''
                if (!characterName) characterName = actorName.text().trim()
                else characterLink = characterLinkEl.attr('href')
                console.log( {
                    ...actor,
                    characters: {
                        ...actor.characters,
                        [showId]: {
                            name: characterName,
                            link: characterLink
                        }
                    }
                })
            })
        })
        return {
            body: { data: returnData.filter(rd => rd !== undefined) }
        }

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