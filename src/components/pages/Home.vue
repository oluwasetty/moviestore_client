<template>
    <div>
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" :src="require(`@/assets/images/header-bg.png`)" alt="First slide">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>Welcome to our movie store</h3>
                        <p>Check for overlap in movies.</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <overlap></overlap>
        </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
export default {
    // mounted() {
    //     this.fetchMovies({ per_page: this.per_page, current_page: this.current_page, callback: this.loadMovies });
    // },
    // methods: {
    //     ...mapActions(['fetchMovies']),
    //     loadMovies(res) {
    //         this.movies = res.data
    //     },
    //     searchMovie(query) {
    //         this.$router.push({ name: 'search', query: { q: query } })
    //     }
    // },
    // data() {
    //     return {
    //         per_page: 12,
    //         current_page: 1,
    //         movies: []
    //     };
    // },
};
</script>
<style scoped>
.carousel-caption {
    bottom: 80px;
}

.carousel-caption h3 {
    font-size: 40px;
}

.carousel-caption p {
    font-size: 20px;
}
</style>