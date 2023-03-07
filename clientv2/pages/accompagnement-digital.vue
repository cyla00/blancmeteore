<script setup lang="ts">

useHead({
    title: 'BlancMeteore | Accompagnement Digital',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore accompagnement digital page' 
        },
    ],
})

</script>

<template>
    <main class="text-center mt-20 pb-20 h-vh90 max-lg:h-full">
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
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">plan "presence"</h4>
                    <img class="w-48 m-auto" src="/assets/graph.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">plan "decollage"</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light">choisir</button>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">réseaux sociaux</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description service</p>
                    <div class="m-auto">
                        <button class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light">choisir</button>
                    </div>
                </div>
        </div>
    </main>
</template>

<style scoped>

</style>