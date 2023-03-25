<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <router-view />
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import "nprogress/nprogress.css";
@import "sweetalert2/dist/sweetalert2.min.css";
@import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

html,
body {
  font-family: "Outfit";
}

#app {
  font-family: "Outfit";
}
</style>
<script>
</script>
