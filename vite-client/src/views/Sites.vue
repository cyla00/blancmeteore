<script lang="ts">
import { defineComponent } from 'vue'
import SitesVitr from '../components/products/SitesVitr.vue'
import SitesEcom from '../components/products/SitesEcom.vue'
import SitesMes from '../components/products/SitesMes.vue'

export default defineComponent({
    name: 'Sites',
    components: {
        SitesVitr,
        SitesEcom,
        SitesMes,
    },
    data(){
        return{
            openVitr: false,
            openEcom: false,
            openMes: false,
        }
    }
})
</script>

<template>
    <section>
        <SitesVitr v-model:open="openVitr"/>
        <SitesEcom v-model:open="openEcom"/>
        <SitesMes v-model:open="openMes"/>
        <div class="card">
            <h3>site vitrine</h3>
            <button @click="this.openVitr = true">demarrer</button>
        </div>

        <div class="card">
            <h3>site e-commerce</h3>
            <button @click="this.openEcom = true">demarrer</button>
        </div>

        <div class="card">
            <h3>site sur mesure</h3>
            <button @click="this.openMes = true">demarrer</button>
        </div>
    </section>
</template>

<style scoped>
section{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 90vh;
}
.card{
    margin: auto;
}
</style>