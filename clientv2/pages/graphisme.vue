<script setup lang="ts">
import GraphForm from '@/components/products/GraphForm.vue'

useHead({
    title: 'BlancMeteore | Graphisme',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore graphisme page' 
        },
    ],
})

const showGraph = ref<boolean>(false)

</script>

<template>
    <main class="text-center mt-20 pb-20 h-vh90">
        <GraphForm v-model:open="showGraph"/>
        <div class="m_auto text-c-dark">   
                <h2 class="font-bold uppercase max-sm:text-3xl text-4xl">créations graphiques</h2>
                <h3 class="text-2xl font-semibold max-lg:text-xl max-sm:text-sm capitalize">des créations graphiques réalisées par des designers professionnels</h3>
            </div>
            
            <div class="flex flex-row mt-20 justify-center max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">graphisme</h4>
                    <img class="w-48 m-auto" src="/assets/acc.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-gradient-to-bl from-blue-dark to-blue-light py-2 px-5 rounded-full text-c-light" @click="showGraph = true">choisir</button>
                    </div>
                </div>
        </div>
    </main>
</template>

<style scoped>
.card{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>