<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <!-- <img :src="require(`@/assets/images/skeleton-loading.gif`)" alt="Movie cover image" class="img-fluid"> -->
        <img :src="movie.image" />
      </div>
      <div class="col-md-8">
        <h3>{{ movie.title }}</h3>
        <!-- <h4>{{ movie.originalTitle }}</h4> -->
        <p>Type: <span>{{ movie.type }}</span></p>
        <!-- <p>Publisher: <span>{{ movie.publisher }}</span></p> -->
        <p>Year: <span>{{ movie.year }}</span></p>
        <!-- <p>ISBN: <span>{{ movie.isbn }}</span></p>
        <p>Description: <span>{{ movie.description }}</span> </p> -->
      </div>
    </div>
  </div>
</template>
  
<script>
import moment from "moment";
import { mapActions } from 'vuex';
export default {
  mounted() {
    this.movie = this.$route.params.movie
    // this.fetchMovieDetails({ id: movie_id, callback: this.loadMovie });
  },
  data() {
    return {
      movie: {}
    };
  },
  methods: {
    // ...mapActions(['fetchMovieDetails']),
    // format_date(date) {
    //   return moment(new Date(date)).format("MMM D, Y")
    // },
    // loadMovie(res) {
    //   this.movie = res.data
    // },
  }
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 100px auto;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

h2 {
  margin-top: 0;
}

h4 {
  margin-bottom: 10px;
  color: #555;
}

p {
  margin: 0;
  font-size: 16px;
  text-align: justify;
}
p span{
  color: #555;
}
</style>