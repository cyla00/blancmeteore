<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sites'
})
</script>

<template>
    <section>
        <div class="card">
            <h3>site vitrine</h3>
            <button>demarrer</button>
        </div>

        <div class="card">
            <h3>site e-commerce</h3>
            <button>demarrer</button>
        </div>

        <div class="card">
            <h3>site sur mesure</h3>
            <button>demarrer</button>
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