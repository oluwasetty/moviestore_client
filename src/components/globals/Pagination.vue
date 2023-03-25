<template>
  <div class="pagination-div">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li> -->
        <li v-for="(link, i) in links" :key="i" class="page-item"><a v-if="link.label == current_page" class="page-link active" @click="getPage(link.label)"
            v-html="getLabel(link.label)" href="#"></a><a v-else class="page-link" @click="getPage(link.label)"
            v-html="getLabel(link.label)" href="#"></a></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "pagination",
  props: {
    current_page: {
      type: Number,
      description: "current_page"
    },
    links: {
      type: Array,
      description: "links"
    },
    fetchMovies: {
      type: Function,
      description: "fetchMovies"
    },
  },
  methods: {
    getLabel(label) {
      return label.includes(';') ? label.substr(label.indexOf('&'), 6) : label
    },
    getPage(label) {
      if (label.includes('Next')) {
        this.fetchMovies(this.current_page + 1)
      } else if (label.includes('Previous')) {
        this.fetchMovies(this.current_page - 1)
      } else {
        this.fetchMovies(label)
      }
    }
  }
}
</script>
<style scoped>
.pagination-div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-link {
  color: #f97141;
}

.page-link:focus,
.page-link:hover, .page-link.active {
  color: #1a1a1a;
}
</style>