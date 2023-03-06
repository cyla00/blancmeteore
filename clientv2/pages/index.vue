<script setup lang="ts">
import Vue3Autocounter from 'vue3-autocounter'
import { useElementVisibility } from '@vueuse/core'

useHead({
    title: 'BlancMeteore | Homepage',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore Homepage' 
        },
    ],
})

const insta = ref<number>(5000)
const face = ref<number>(2500)
const creations = ref<number>(270)
const video = ref<number>(85)
const finished = ref<boolean>(false)

const instaCounter = ref(null)
const faceCounter = ref(null)
const creaCounter = ref(null)
const videoCounter = ref(null)

const target = ref(null)
const isVisible = useElementVisibility(target)

watch(isVisible, (event) => {
    if(event && !finished.value){
        instaCounter.value?.start()
        faceCounter.value?.start()
        creaCounter.value?.start()
        videoCounter.value?.start()
    }
})

</script>

<template>
    <main class="">
        <section class="">
            <div class="grid grid-flow-col bg-opaque-light mx-5 my-5 backdrop-blur-md rounded-3xl p-10 h-vh85 text-c-dark max-lg:grid-flow-row">

                <div class="m-auto max-sm:text-center">
                    <p class="capitalize text-sm font-bold text-blue-dark max-lg:text-xs">la communication accessible a tous</p>
                    <h1 class="uppercase text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-blue-dark to-blue-light max-lg:text-4xl max-sm:text-3xl">blanc meteore</h1>
                    <h2 class="capitalize text-2xl font-semibold max-lg:text-xl max-sm:text-sm">agence de communication, design <br> & developpement innovante.</h2>
                </div>

                <div class="m-auto">
                    <img src="/assets/ph.png" alt="">
                </div>
            </div>
        </section>

        <section class="text-center mt-20 pb-20">
            <div class="m_auto text-c-light">   
                <h2 class="font-bold uppercase max-sm:text-3xl text-4xl">nos solutions</h2>
                <h3 class="text-2xl font-semibold max-lg:text-xl max-sm:text-sm capitalize">découvrez ce que nous faisons</h3>
            </div>
            
            <div class="flex flex-row mt-20 justify-center max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">accompagnement digital</h4>
                    <img class="w-48 m-auto" src="/assets/acc.png" alt="service icon">
                    <p class="m-auto">courte description categorie</p>
                    <div class="m-auto">
                        <NuxtLink class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" to="/accompagnement-digital/">decouvrir</NuxtLink>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">graphisme</h4>
                    <img class="w-48 m-auto" src="/assets/graph.png" alt="service icon">
                    <p class="m-auto">courte description categorie</p>
                    <div class="m-auto">
                        <NuxtLink class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" to="/graphisme/">decouvrir</NuxtLink>
                    </div>
                </div>

                <div class="max-lg:m-auto max-lg:mt-5 w-card-w h-card-h card duration-200 bg-opaque-light py-10 px-5 grid grid-flow-row rounded-xl mx-5 border-2 border-transparent hover:border-blue-dark">
                    <h4 class="capitalize m-auto bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold">developpement sites</h4>
                    <img class="w-48 m-auto" src="/assets/sites.png" alt="service icon">
                    <p class="m-auto">courte description categorie</p>
                    <div class="m-auto">
                        <NuxtLink class="duration-200 desktop-btn capitalize bg-blue-light py-2 px-5 rounded-full text-c-light" to="/creation-sites/">decouvrir</NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-c-light py-20">
            <div class="grid grid-cols-5 gap-y-7 justify-center max-md:grid-cols-3 max-md:gap-y-10">
                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo1.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo2.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo3.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo4.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo5.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo6.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo7.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo8.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo9.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo10.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo11.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo12.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo13.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo14.png" alt="" srcset="">
                </div>

                <div class="m-auto mx-5">
                    <img class="m-auto w-24" src="/assets/logo15.png" alt="" srcset="">
                </div>
            </div>
        </section>

        <v-divider class="border-opacity-100" color="info"></v-divider>

        <section class="bg-c-light py-20">
            <div class="py-20">
                equipe
            </div>
            <div class="flex flex-row justify-center py-20 text-c-dark max-xl:grid max-xl:grid-cols-2 max-xl:gap-5 max-sm:grid-cols-1" ref="target">
                <div class="mx-5 card px-10 py-5 w-64 rounded-xl max-xl:m-auto">
                    <span class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl">+</span><vue3-autocounter class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl" ref='instaCounter' :startAmount='0' separator='' :endAmount='insta' :duration='2' :autoinit='false' @finished="finished = true"/>
                    <p class="capitalize">abonnés Instagram</p>
                </div>

                <div class="mx-5 card px-10 py-5 w-64 rounded-xl max-xl:m-auto">
                    <span class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl">+</span><vue3-autocounter class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl" ref='faceCounter' :startAmount='0' separator='' :endAmount='face' :duration='2' :autoinit='false' @finished="finished = true"/>
                    <p class="capitalize">abonnés facebook</p>
                </div>

                <div class="mx-5 card px-10 py-5 w-64 rounded-xl max-xl:m-auto">
                    <span class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl">+</span><vue3-autocounter class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl" ref='creaCounter' :startAmount='0' separator='' :endAmount='creations' :duration='2' :autoinit='false' @finished="finished = true"/>
                    <p class="capitalize">créations graphiques</p>
                </div>

                <div class="mx-5 card px-10 py-5 w-64 rounded-xl max-xl:m-auto">
                    <span class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl">+</span><vue3-autocounter class="bg-clip-text text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold text-3xl" ref='videoCounter' :startAmount='0' separator='' :endAmount='video' :duration='2' :autoinit='false' @finished="finished = true"/>
                    <p class="capitalize">vidéos</p>
                </div>
            </div>  
        </section>
    </main>
</template>

<style scoped>
.card{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
</style>