<script lang="ts">
import { defineComponent } from 'vue'
import Graphisme from '../components/products/Graphisme.vue'

export default defineComponent({
    name: 'Graphique',
    components: {
        Graphisme,
    },
    data(){
        return{
            open: false
        }
    }
})
</script>

<template>
    <section>
        <div class="card">
            <Graphisme v-model:open="open"/>
            <h3>creation graphiques</h3>
            <button @click="this.open = true">demarrer</button>
        </div>
    </section>
</template>

<style scoped>
section{
    display: grid;
    grid-template-columns: 1fr;
    height: 90vh;
}
.card{
    margin: auto;
}
</style>