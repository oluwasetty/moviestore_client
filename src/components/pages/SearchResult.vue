<template>
  <div>
    <div>
      <search :querystring="query" :searchMovie="searchMovie"></search>
      <div v-if="movies.length > 0" class="text-center"><small>Found {{ count }} records</small></div>
    </div>
    <div v-if="movies.length > 0">
      <movies :items="movies"></movies>
      <pagination :links="links" :fetchMovies="fetchMovies" :current_page="current_page"></pagination>
    </div>
    <div class="text-center" v-else>
      <img :src="require(`@/assets/images/Flip-Flop.gif`)">
    </div>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
export default {
  mounted() {
    if (this.query) {
      this.searchMovies({ query: this.query, per_page: this.per_page, current_page: 1, callback: this.loadMovies });
    }
  },
  methods: {
    ...mapActions(['searchMovies']),
    loadMovies(res) {
      this.movies = res.data,
        this.count = res.meta.total,
        this.current_page = res.meta.current_page,
        this.links = res.meta.links
    },
    searchMovie(query) {
      this.query = query
      this.$router.replace({ name: 'search', query: { ...this.$route.query, q: query } })
      this.searchMovies({ query: query, per_page: this.per_page, current_page: 1, callback: this.loadMovies });
    },
    fetchMovies(current_page) {
      this.searchMovies({ query: this.query, per_page: this.per_page, current_page: current_page, callback: this.loadMovies });
    },
  },
  data() {
    return {
      query: this.$route.query.q,
      per_page: 24,
      current_page: 1,
      links: [],
      movies: [],
      count: 0
    };
  },
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

img {
  width: 80%;
}
</style>