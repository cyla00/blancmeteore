<script setup lang="ts">

import VitrineForm from '@/components/products/VitrineForm.vue'
import EcomForm from '@/components/products/EcomForm.vue'
import MesureForm from '@/components/products/MesureForm.vue';

useHead({
    title: 'BlancMeteore | Creation Sites',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore creation sites page' 
        },
    ],
})

const openVitr = ref<boolean>(false)
const openEcom = ref<boolean>(false)
const openMesure = ref<boolean>(false)

</script>

<template>
    <main class="text-center mt-20 pb-20 h-vh90 max-lg:h-full">
        <VitrineForm v-model:open="openVitr"/>
        <EcomForm v-model:open="openEcom"/>
        <MesureForm v-model:open="openMesure"/>
        <div class="m_auto text-c-light">   
                <h2 class="font-bold uppercase max-sm:text-3xl text-4xl">developpement de sites</h2>
                <h3 class="text-2xl font-semibold max-lg:text-xl max-sm:text-sm capitalize">sites et outils pour votre activité en ligne</h3>
            </div>
            
            <div class="flex flex-row mt-20 justify-center max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">site vitrine</h4>
                    <img class="w-48 m-auto" src="/assets/acc.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="openVitr = true">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">site e-commerce</h4>
                    <img class="w-48 m-auto" src="/assets/graph.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="openEcom = true">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">site sur mesure</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="openMesure = true">choisir</button>
                    </div>
                </div>
        </div> 
    </main>
</template>

<style scoped>

</style>