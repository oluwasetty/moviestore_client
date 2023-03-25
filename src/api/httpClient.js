import axios from 'axios';
import NProgress from 'nprogress'
import store from './../store/index'
import router from "./../router"

/** Default config for axios instance */
let config = {
    baseURL: 'http://localhost:8000/api/',
    // timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        // anything you want to add to the headers
    }
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

/** Auth token interceptors */
const authInterceptor = config => {
    /** TODO: Add auth token */
    let token = store.getters.token;
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    NProgress.start()
    return config;
};

/** logger interceptors */
const loggerInterceptor = config => {
    /** TODO */
    return config;
}

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor, (error) => {
    // Do something with request error
    return Promise.reject(error);
});
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        /** TODO: Add any response interceptors */
        NProgress.done()
        return response;
    },
    async (err) => {
        /** TODO: Do something with response error */
        NProgress.done()
        const originalConfig = err.config;

        if (originalConfig.url !== "/login" && err.response) {
    //         // Access Token was expired
            if (err.response.status === 401) {
                store.dispatch('logout', { callback: () => { router.push({ name: 'login' })}});
                // if (err.response.status === 401 && !originalConfig._retry) {
    //             store.commit('notification', { "status": "error", "message": "Token expired, refreshing..." })
    //             originalConfig._retry = true;

    //             try {
    //                 await store.dispatch('refreshToken');

    //                 return httpClient(originalConfig);
    //             } catch (_error) {
    //                 return Promise.reject(_error);
    //             }
            }
        }
        return Promise.reject(err);
    }
);
export default httpClient;