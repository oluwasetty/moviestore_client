import Search from './globals/Search.vue'
import Movies from './globals/Movies.vue'
import Overlap from './globals/Overlap.vue'
import OverlapList from './globals/OverlapList.vue'
import CharacterImage from './globals/CharacterImage.vue'

export default {
    install(Vue) {
      Vue.component(Search.name, Search);
      Vue.component(Movies.name, Movies);
      Vue.component(Overlap.name, Overlap);
      Vue.component(OverlapList.name, OverlapList);
      Vue.component(CharacterImage.name, CharacterImage);
    }
}