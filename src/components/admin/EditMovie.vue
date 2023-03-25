<template>
    <div class=" container mt-4">
        <div class="mb-4">
            <h3>Edit Movie</h3>
            <router-link id="search-btn" class="btn my-2 my-sm-0" to="/list-movie">Go to List</router-link>
        </div>
        <form @submit.prevent="saveMovie">
            <div class="form-group">
                <label>Title:</label>
                <input required v-model="movie.title" type="text" class="form-control" placeholder="Enter Title">
            </div>
            <div class="form-group">
                <label>Author:</label>
                <input required v-model="movie.author" type="text" class="form-control" placeholder="Enter Author">
            </div>
            <div class="form-group">
                <label>Genre:</label>
                <input required v-model="movie.genre" type="text" class="form-control" placeholder="Enter Genre">
            </div>
            <div class="form-group">
                <label>ISBN:</label>
                <input required v-model="movie.isbn" type="text" class="form-control" placeholder="Enter ISBN">
            </div>
            <div class="form-group">
                <label>Publisher:</label>
                <input required v-model="movie.publisher" type="text" class="form-control" placeholder="Enter Publisher">
            </div>
            <div class="form-group">
                <label>Published Date:</label>
                <input required v-model="movie.published" type="date" class="form-control" placeholder="Enter Published Date">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea v-model="movie.description" type="text" rows="5" class="form-control" placeholder="Enter Description"></textarea>
            </div>
            <button type="submit" class="btn my-2 my-sm-0 btn-dark">
                Submit
            </button>
        </form>
    </div>
</template>
<script>
import moment from "moment";
import { mapActions } from 'vuex';
export default {
    mounted() {
      this.movie_id = this.$route.params.id
        this.$store.dispatch("fetchMovieDetails", { id: this.movie_id, callback: this.loadMovie });
    },
    methods: {
        ...mapActions(['updateMovie']),
        saveMovie() {
            this.updateMovie({ id: this.movie_id, movie: this.movie, callback: this.onSaved });
        },
        onSaved() {
            // this.movie = {
            //     title: "",
            //     author: "",
            //     isbn: "",
            //     genre: "",
            //     publisher: "",
            //     published: "",
            //     description: ""
            // }
        },
        loadMovie(res) {
            this.movie = {...res.data, published: moment(new Date(res.data.published)).format("YYYY-MM-DD")}
        },
    },
    data() {
        return {
            movie_id: "",
            movie: {
                title: "",
                author: "",
                isbn: "",
                genre: "",
                publisher: "",
                published: "",
                description: ""
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