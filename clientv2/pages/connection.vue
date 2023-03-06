<script setup lang="ts">
import Popup from '@/components/Popup.vue'

useHead({
    title: 'BlancMeteore | Connection',
    meta: [
        {
            name: 'description',
            content: 'BlancMeteore connection page' 
        },
    ],
})

let Show = ref<boolean>(false)
let ErrMsg = ref<string>('test')
let SuccMsg = ref<string>('')

setTimeout(() => {
    Show.value = true
}, 3000)


let switcher = ref<string>('connection')
const reg_first_name = ref<string>()
const reg_last_name = ref<string>()
const reg_email = ref<string>()
const reg_password = ref<string>()
const reg_repeat_password = ref<string>()
const log_email = ref<string>()
const log_password = ref<string>()

const submit = () => {
    if(switcher.value === 'connection'){

    }

    if(switcher.value === 'registration'){
        
    }
}

</script>

<template>
    <main class="h-vh90 flex flex-col justify-center duration-200 max-lg:h-screen">
        <Popup v-model:Show="Show" v-model:ErrMsg="ErrMsg" v-model:SuccMsg="SuccMsg" />
        <div class="card font-semibold text-c-dark bg-c-light m-auto rounded-lg w-connection-card duration-200 max-lg:w-4/5">
            <div class="grid grid-cols-2 duration-200 max-lg:grid-cols-1">
                <div class="capitalize text-c-light bg-c-dark rounded-tl-lg px-5 py-5 flex justify-center">
                    <div class="rounded-full bg-c-light text-sm">
                        <button 
                            :class="{'btn-bg': switcher === 'connection'}" 
                            class="duration-200 py-2 px-5 text-c-dark rounded-l-full focus:bg-blue-light focus:text-c-light rounded-full hover:bg-slate-400/50" 
                            @click="switcher = 'connection'">
                            connection
                        </button>

                        <button 
                            :class="{'btn-bg': switcher === 'registration'}" 
                            class="duration-200 py-2 px-5 text-c-dark rounded-r-full focus:bg-blue-light focus:text-c-light rounded-full hover:bg-slate-400/50" 
                            @click="switcher = 'registration'">
                            registration
                        </button>
                    </div>
                    
                </div>
                <div class="max-lg:hidden"></div> 
            </div>

            <div v-if="switcher === 'connection'" class="m-auto bg-c-light grid grid-cols-2 rounded-b-lg duration-200 max-lg:grid-cols-1">
                <div class="bg-c-dark py-5 rounded-bl-lg duration-200 max-lg:hidden">
                    <img class="w-96 m-auto duration-200" src="/assets/login.png" alt="">
                </div>

                <div class="m-auto w-9/12 max-lg:my-10">
                    <h3 class="bg-clip-text capitalize text-xl text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold mb-5">s'identifier</h3>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="email" v-model="log_email" placeholder="email">
                    </div>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="password" v-model="log_password" placeholder="mot de passe">
                    </div>

                    <div class="flex justify-center">
                        <button class="my-2 duration-200 desktop-btn capitalize bg-blue-light py-2 px-10 rounded-full text-c-light" @click="submit">submit</button>
                    </div>
                    
                </div>
            </div>

            <div v-if="switcher === 'registration'" class="m-auto bg-c-light grid grid-cols-2 rounded-b-lg duration-200 max-lg:grid-cols-1">
                <div class="bg-c-dark py-5 rounded-bl-lg max-lg:hidden">
                    <img class="w-96 m-auto duration-200" src="/assets/login.png" alt="">
                </div>

                <div class="m-auto w-9/12 duration-200 max-lg:my-10">
                    <h3 class="bg-clip-text capitalize text-xl text-transparent bg-gradient-to-bl from-blue-dark to-blue-light font-bold mb-5">inscrivez-vous pour accéder</h3>
                    
                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="text" v-model="reg_first_name" placeholder="prénom">
                    </div>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="text" v-model="reg_last_name" placeholder="nom">
                    </div>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="email" v-model="reg_email" placeholder="email">
                    </div>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="password" v-model="reg_password" placeholder="mot de passe">
                    </div>

                    <div class="w-full flex flex-col mb-5">
                        <input class="duration-200 focus:outline-cyan-500 text-sm py-2 px-5 border outline-none border-c-dark rounded-full" type="password" v-model="reg_repeat_password" placeholder="répéter le mot de passe">
                    </div>
                    
                    <div class="flex justify-center">
                        <button class="my-2 duration-200 desktop-btn capitalize bg-blue-light py-2 px-10 rounded-full text-c-light" @click="submit">submit</button>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<style scoped>
.card{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.btn-bg{
    background: #49B0AA;
    color: #ffffff;
}
</style>