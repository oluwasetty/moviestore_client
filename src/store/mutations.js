let mutations = {
    auth(state, { token, user }) {
        state.token = token
        state.user = user
    },
    token(state, { token }) {
        state.token = token
    },
    notification(state, {status, message}) {
        state.notification = {status, message}
    },
    logout(state) {
        state.token = null
        state.user = {}
    }
}
export default mutations