<template>
    <div class=" container mt-4">
        <div class="mb-4">
            <h3>Login</h3>
            <!-- <router-link id="search-btn" class="btn my-2 my-sm-0" to="/list-movie">Go to List</router-link> -->
        </div>
        <form @submit.prevent="doLogin">
            <div class="form-group">
                <label>Email:</label>
                <input required v-model="user.email" type="email" class="form-control" placeholder="Enter Email">
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input required v-model="user.password" type="password" class="form-control" placeholder="Enter Password">
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input required class="form-check-input required" type="checkbox" name="remember">
                    Remember me
                </label>
            </div>
            <button type="submit" class="btn my-2 my-sm-0 btn-dark">
                Submit
            </button>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['login']),
        doLogin() {
            this.login({ user: this.user, callback: this.onLogin });
        },
        onLogin() {
            this.$router.push({name: 'home'})
        }
    },
    data() {
        return {
            user: {
                email: "",
                password: "",
            }
        };
    },
};
</script>
<style scoped>
#search:focus {
    outline: none
}

#search-btn {
    border-color: #f97141;
    color: #f97141;
    background-color: #fff;
}

#search-btn:hover {
    background-color: #f97141;
    color: #fff;
}
</style>