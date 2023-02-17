<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Accompagnement'
})
</script>

<template>
    <section>
        <div class="card">
            <h3>plan A "lancement"</h3>
            <button>demarrer</button>
        </div>

        <div class="card">
            <h3>plan B "presence"</h3>
            <button>demarrer</button>
        </div>

        <div class="card">
            <h3>plan C "decollage"</h3>
            <button>demarrer</button>
        </div>

        <div class="card">
            <h3>analytics/audit</h3>
            <button>demarrer</button>
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