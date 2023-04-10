<template>
    <div class="container" title="Search for the overlap in movies.">
        <form @submit.prevent="findMatches">
        <div class="row wrapper">
            <div class="col-6">
                <div class="search-input" id="search1">
                    <a href="" target="_blank" hidden></a>
                    <input @keyup="onSearchKey1" v-model="movie1.title" type="text" placeholder="First movie name.." :readonly="searched" required>
                    <div v-if="suggestions1.length" class="autocom-box">
                        <li v-for="data in suggestions1" :key="data.id" @click="select1(data)">
                            <span>{{ data.title }}</span> <small style="float: right;">{{ data.year }}-{{ data.type }}</small>
                        </li>
                    </div>
                    <div class="icon"><i class="fas fa-search"></i></div>
                </div>
            </div>
            <div class="col-6">
                <div class="search-input" id="search2">
                    <a href="" target="_blank" hidden></a>
                    <input @keyup="onSearchKey2" v-model="movie2.title" type="text" placeholder="Second movie name.." :readonly="searched" required>
                    <div v-if="suggestions2.length" class="autocom-box">
                        <li v-for="data in suggestions2" :key="data.id" @click="select2(data)">
                            <span>{{ data.title }}</span> <small style="float: right;">{{ data.year }}-{{ data.type }}</small>
                        </li>
                    </div>
                    <div class="icon"><i class="fas fa-search"></i></div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div v-if="!searched" id="search-btn">
                <button type="submit" class="btn my-2 my-sm-0 btn-dark">Find Matches</button>
            </div>
            <div v-else id="search-btn">
                <button @click="reset" class="btn my-2 my-sm-0 btn-dark">Reset</button>
            </div>
        </div>
    </form>
        <overlaplist v-if="searched && matches.length" :first="movie1" :second="movie2" :matches=matches></overlaplist>
        <div v-if="searched && !matches.length" :first="movie1" class="container text-danger text-center mt-4">No match Found!!!</div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
export default {
    name: "overlap",
    data() {
        return {
            movie1: {
                year: '',
                id: '',
                title: '',
                type: ''
            },
            movie2: {
                year: '',
                id: '',
                title: '',
                type: ''
            },
            suggestions1: [],
            suggestions2: [],
            matches: [],
            searched: false
        }
    },
    methods: {
        ...mapActions(['searchMovies', 'loadMatches']),
        loadMovies1(res) {
            this.suggestions1 = res.data
        },
        loadMovies2(res) {
            this.suggestions2 = res.data
        },
        setMatches(res) {
            this.matches = res.data
            this.searched = true
        },
        findMatches() {
            this.loadMatches({ first_id: this.movie1.id, second_id: this.movie2.id, callback: this.setMatches });
        },
        reset() {
            this.searched = false
            this.movie1 = {
                year: '',
                id: '',
                title: '',
                type: ''
            }
            this.movie2 = {
                year: '',
                id: '',
                title: '',
                type: ''
            }
        },
        onSearchKey1() {
            // getting all required elements
            const searchWrapper = document.querySelector("#search1");
            if (this.movie1.title.length) {
                this.searchMovies({ query: this.movie1.title, per_page: this.per_page, current_page: 1, callback: this.loadMovies1 });
                searchWrapper.classList.add("active"); //show autocomplete box
            } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
        },
        onSearchKey2() {
            // getting all required elements
            const searchWrapper = document.querySelector("#search2");
            if (this.movie2.title.length) {
                this.searchMovies({ query: this.movie2.title, per_page: this.per_page, current_page: 1, callback: this.loadMovies2 });
                searchWrapper.classList.add("active"); //show autocomplete box
            } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
        },
        select1(selectData) {
            // getting all required elements
            const searchWrapper = document.querySelector("#search1");
            // let selectData = e.target.innerText;
            this.movie1 = selectData;
            searchWrapper.classList.remove("active");
        },
        select2(selectData) {
            // getting all required elements
            const searchWrapper = document.querySelector("#search2");
            // let selectData = e.target.innerText;
            this.movie2 = selectData;
            searchWrapper.classList.remove("active");
        }
    }
}
</script>
<style scoped>
::selection {
    color: #fff;
    background: #664AFF;
}

.wrapper {
    max-width: 800px;
    margin: 50px auto;
}

.wrapper .search-input {
    background: #fff;
    width: 100%;
    border-radius: 5px;
    position: relative;
    box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.12);
}

.search-input input {
    height: 55px;
    width: 100%;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 60px 0 20px;
    font-size: 18px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}

.search-input.active input {
    border-radius: 5px 5px 0 0;
}

.search-input .autocom-box {
    padding: 0;
    opacity: 0;
    pointer-events: none;
    max-height: 280px;
    overflow-y: auto;
}

.search-input.active .autocom-box {
    padding: 10px 8px;
    opacity: 1;
    pointer-events: auto;
}

.autocom-box li {
    list-style: none;
    padding: 8px 12px;
    display: none;
    width: 100%;
    cursor: default;
    border-radius: 3px;
}

.search-input.active .autocom-box li {
    display: block;
}

.autocom-box li:hover {
    background: #efefef;
}

.search-input .icon {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 55px;
    width: 55px;
    text-align: center;
    line-height: 55px;
    font-size: 20px;
    color: #644bff;
    cursor: pointer;
}
</style>