<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Graphique'
})
</script>

<template>
    <section>
        <div class="card">
            <h3>creation graphiques</h3>
            <button>demarrer</button>
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