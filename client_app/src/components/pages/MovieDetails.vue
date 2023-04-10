<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <img :src="movie.image" />
      </div>
      <div class="col-md-8">
        <h3>{{ movie.title }}</h3>
        <p>Type: <span>{{ movie.type }}</span></p>
        <p>Year: <span>{{ movie.year }}</span></p>
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
  },
  data() {
    return {
      movie: {}
    };
  },
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