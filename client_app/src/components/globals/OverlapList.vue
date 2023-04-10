<template>
    <div v-if="matches.length" class="container" title="Results of overlap.">
        <div class="row wrapper">
            <div class="col-4">
                <img class="rounded" :src="first.image" />
            </div>
            <div class="col-4">
                <div class="img-container">
                <div style="font-size: 70px; font-weight: bold;">{{ matches.length }}</div>
                </div>
                <div class="img-container">
                <div>Results Found</div>
                </div>
            </div>
            <div class="col-4">
                <img class="rounded" :src="second.image" />
            </div>
        </div>
        <div v-for="(match, i) in matches" :key="i" class="row wrapper">
            <div class="col-4">
                <div class="text-center mb-2">{{ match.characters[first.id].name }}</div>
                <characterimage :link="match.characters[first.id].link"></characterimage>
            </div>
            <div class="col-4">
                <div class="text-center mb-2">{{ match.name }}</div>
                <div class="img-container">
                    <i class="material-icons">arrow_back</i>
                    <img class="rounded" :src="match.image" />
                    <i class="material-icons">arrow_forward</i>
                </div>
            </div>
            <div class="col-4">
                <div class="text-center mb-2">{{ match.characters[second.id].name }}</div>
                <characterimage :link="match.characters[second.id].link"></characterimage>
            </div>
        </div>
    </div>
</template>
  
<script>
import "@/assets/overlap.css";
export default {
    name: "overlaplist",
    props: {
        matches: {
            type: Array,
            description: "List of overlaps"
        },
        first: {
            type: Object,
            description: "First movie"
        },
        second: {
            type: Object,
            description: "Second movie"
        }
    },
}
</script>
<style scoped>
.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper {
    max-width: 800px;
    margin: 50px auto;
    background: rgba(0,0,0,0.9);
    color:aliceblue;
    border-radius: 20px;
    padding: 20px 0;
    background-image: url("@/assets/images/header-bg.png");
}
</style>