<template>
  <div class="img-container">
    <img class="rounded-circle" :src=src />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "characterimage",
  props: {
    link: {
      type: String,
      description: "image link"
    },
  },
  data() {
    return {
      src: ""
    }
  },
  mounted() {
    this.getCharacterImage({ link: this.link, callback: this.placeImage });
  },
  methods: {
    ...mapActions(['getCharacterImage']),
    placeImage(data) {
      this.src = data.src
    },
  }
}
</script>
<style scoped>
img {
  height: 150px;
}
</style>