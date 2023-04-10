<template>
    <div>
        <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" :src="require(`@/assets/images/header-bg.png`)" alt="First slide">
                    <div class="carousel-caption d-none d-md-block">
                        <h3>Welcome to our movie store</h3>
                        <p>Check for overlap in movies.</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <overlap></overlap>
        </div>
    </div>
</template>
  
<script>
</script>
<style scoped>
.carousel-caption {
    bottom: 80px;
}

.carousel-caption h3 {
    font-size: 40px;
}

.carousel-caption p {
    font-size: 20px;
}
</style>