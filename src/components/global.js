import Search from './globals/Search.vue'
import Movies from './globals/Movies.vue'
import Pagination from './globals/Pagination.vue'
import Overlap from './globals/Overlap.vue'

export default {
    install(Vue) {
      Vue.component(Search.name, Search);
      Vue.component(Movies.name, Movies);
      Vue.component(Pagination.name, Pagination);
      Vue.component(Overlap.name, Overlap);
    }
}