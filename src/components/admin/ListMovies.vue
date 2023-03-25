<template>
    <div class="table-responsive container-fluid mt-4">
        <div class="mb-4">
            <h3>List of Movies</h3>
            <router-link id="search-btn" class="btn my-2 my-sm-0" to="/add-movie">Add New</router-link>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">S/No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Published</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movie, i) in movies" :key="i">
                    <th scope="row">{{ ((current_page - 1) * per_page) + i + 1 }}</th>
                    <td>{{ movie.title }}</td>
                    <td>{{ movie.author }}</td>
                    <td>{{ movie.genre }}</td>
                    <td>{{ movie.publisher }}</td>
                    <td>{{ movie.isbn }}</td>
                    <td>{{ format_date(movie.published) }}</td>
                    <td>
                        <router-link class="text-info" :to="`/edit-movie/${movie.id}`">Edit</router-link>&nbsp;|
                        <a @click.prevent="deleteOnemovie(movie.id)" class="text-danger" href="!#">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination :links="links" :fetchMovies="fetchPagedMovies" :current_page="current_page"></pagination>
    </div>
</template>
<script>
const Swal = require('sweetalert2')
import moment from "moment";
import { mapActions } from 'vuex';
export default {
    mounted() {
        this.fetchMovies({ current_page: 1, per_page: this.per_page, callback: this.loadMovies });
    },
    methods: {
        ...mapActions(['fetchMovies','deleteMovie']),
        loadMovies(res) {
            this.movies = res.data,
                this.count = res.meta.total,
                this.current_page = res.meta.current_page,
                this.links = res.meta.links
        },
        format_date(date) {
            return moment(new Date(date)).format("MMM D, Y")
        },
        fetchPagedMovies(current_page) {
            this.fetchMovies({ current_page: current_page, per_page: this.per_page, callback: this.loadMovies });
        },
        deleteOnemovie(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteMovie({ id, callback: this.reIndexMovies })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

        },
        reIndexMovies(id) {
            this.movies = this.movies.filter(movie => movie.id !== id);
        },
    },
    data() {
        return {
            query: this.$route.query.q,
            per_page: 20,
            current_page: 1,
            links: [],
            movies: [],
            count: 0
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