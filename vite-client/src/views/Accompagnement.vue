<script lang="ts">
import { defineComponent } from 'vue'
import PlanA from '../components/products/PlanA.vue'
import PlanB from '../components/products/PlanB.vue'
import PlanC from '../components/products/PlanC.vue'
import Audit from '../components/products/Audit.vue'

export default defineComponent({
    name: 'Accompagnement',
    components: {
        PlanA,
        PlanB,
        PlanC,
        Audit,
    },
    data(){
        return{
            openA: false,
            openB: false,
            openC: false,
            openAudit: false,
        }
    }
})
</script>

<template>
    <section>
        <PlanA v-model:open="openA"/>
        <PlanB v-model:open="openB"/>
        <PlanC v-model:open="openC"/>
        <Audit v-model:open="openAudit"/>
        <div class="card">
            <h3>plan A "lancement"</h3>
            <button @click="this.openA = true">demarrer</button>
        </div>

        <div class="card">
            <h3>plan B "presence"</h3>
            <button @click="this.openB = true">demarrer</button>
        </div>

        <div class="card">
            <h3>plan C "decollage"</h3>
            <button @click="this.openC = true">demarrer</button>
        </div>

        <div class="card">
            <h3>analytics/audit</h3>
            <button @click="this.openAudit = true">demarrer</button>
        </div>
    </section>
</template>

<style scoped>
section{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 90vh;
}
.card{
    margin: auto;
}
</style>