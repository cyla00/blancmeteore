<script setup lang="ts">
import AuditForm from '@/components/products/AuditForm.vue'
import DecollageForm from '@/components/products/DecollageForm.vue'
import LancementForm from '@/components/products/LancementForm.vue'
import PresenceForm from '@/components/products/PresenceForm.vue'

useHead({
    title: 'BlancMeteore | Accompagnement Digital',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore accompagnement digital page' 
        },
    ],
})

const showAudit = ref<boolean>(false)
const showDecollange = ref<boolean>(false)
const showLancement = ref<boolean>(false)
const showPresence = ref<boolean>(false)



</script>

<template>
    <main class="text-center mt-20 pb-20 h-vh90 max-lg:h-full">

        <AuditForm v-model:open="showAudit" />
        <DecollageForm v-model:open="showDecollange" />
        <LancementForm v-model:open="showLancement" />
        <PresenceForm v-model:open="showPresence" />

        <div class="m_auto text-c-light">   
                <h2 class="font-bold uppercase max-sm:text-3xl text-4xl">accompagnement Digital</h2>
                <h3 class="text-2xl font-semibold max-lg:text-xl max-sm:text-sm capitalize">laissez-nous vous aider à améliorer votre présence sur les réseaux</h3>
            </div>
            
            <div class="flex flex-row mt-20 justify-center max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">plan "lancement"</h4>
                    <img class="w-48 m-auto" src="/assets/acc.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="showLancement = true">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">plan "presence"</h4>
                    <img class="w-48 m-auto" src="/assets/graph.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="showPresence = true">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">plan "decollage"</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="showDecollange = true">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">audit réseaux sociaux</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" @click="showAudit = true">choisir</button>
                    </div>
                </div>
        </div>
    </main>
</template>

<style scoped>

</style>