let getters = {
    isLoggedIn: state => !!state.token,
    notification: state => state.notification,
    token: state => state.token,
    user: state => state.user,
}

export default getters