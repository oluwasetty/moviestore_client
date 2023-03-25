import Search from './globals/Search.vue'
import Movies from './globals/Movies.vue'
import Pagination from './globals/Pagination.vue'

export default {
    install(Vue) {
      Vue.component(Search.name, Search);
      Vue.component(Movies.name, Movies);
      Vue.component(Pagination.name, Pagination);
    }
}