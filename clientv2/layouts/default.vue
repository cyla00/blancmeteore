<script setup lang="ts">
import { createDOMCompilerError } from '@vue/compiler-dom';
import axios from 'axios'
import jwt_decode from "jwt-decode"

let isLogged = ref<boolean>(false)
let mobileNav = ref<boolean>(false)
let scrollPosition = ref<boolean>(false)
let year = new Date().getFullYear()

const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value
}
const updateScroll = () => {
    const scroll = window.scrollY
    
    if(scroll > 65){
        scrollPosition.value = true
        return
    }
    scrollPosition.value = false
    return
}


const logout = async () => {
    if(confirm('are you sure you want to logout?')){
        isLogged.value = false
        localStorage.removeItem('token')
        await navigateTo({ path: '/connection' })
    }
    return
}

window.addEventListener('scroll', updateScroll)

onUpdated(async () => {
    if(localStorage.getItem('token')){
        const auth = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then((res) => {
            if(res.status === 200) {
                const token_role:any = jwt_decode(localStorage.getItem('token'))
                return isLogged.value = true
            }
        }).catch(async (_err) => {
            localStorage.clear()
            isLogged.value = false
            await navigateTo({ path: '/connection' })
        })
    }
})

onMounted(async () => {
    if(localStorage.getItem('token')){
        const auth = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then((res) => {
            if(res.status === 200) {
                const token_role:any = jwt_decode(localStorage.getItem('token'))
                return isLogged.value = true
            }
        }).catch(async (_err) => {
            localStorage.clear()
            isLogged.value = false
            await navigateTo({ path: '/connection' })
        })
    }
})

</script>

<template>
    <div class="">
        <header class="text-base sticky top-0 z-40">
            <nav class="bg-opaque-light backdrop-blur-md max-lg:hidden mx-5 my-5 grid grid-flow-col py-2 px-10 duration-100 rounded-full ease-linear" :class="{'scrolled-nav': scrollPosition}">
                <div class="">
                    <NuxtLink to="/"><img class="w-32 duration-200 desktop-btn" src="/assets/logo.png" alt=""></NuxtLink>
                </div>

                <div class="m-auto">
                    <NuxtLink class="duration-200 desktop-btn mx-5 capitalize" to="/accompagnement-digital/">réseaux sociaux</NuxtLink>
                    <NuxtLink class="duration-200 desktop-btn mx-5 capitalize" to="/graphisme/">Graphisme</NuxtLink>
                    <NuxtLink class="duration-200 desktop-btn mx-5 capitalize" to="/creation-sites/">Creations web</NuxtLink>
                </div>
                    
                <div class="m-auto">
                    <NuxtLink class="duration-200 desktop-btn capitalize bg-gradient-to-bl from-blue-dark to-blue-light py-2 px-5 rounded-full text-c-light mx-2" to="/connection/" v-if="!isLogged">connexion <i class='bx bxs-right-arrow-alt'></i></NuxtLink>
                    <NuxtLink class="duration-200 desktop-btn capitalize bg-gradient-to-bl from-blue-dark to-blue-light py-2 px-5 rounded-full text-c-light mx-2" to="/accounts/" v-if="isLogged">espace <i class='bx bxs-user bx-xs'></i></NuxtLink>
                    <button class="duration-200 desktop-btn capitalize bg-c-red text-c-light rounded-full p-2 mx-2 align-middle" @click="logout" v-if="isLogged">déconnexion <i class='bx bx-log-out-circle bx-xs'></i></button>
                </div>
            </nav>

            <nav class="bg-c-light lg:hidden py-2 px-5">
                <div class="flex justify-end">
                    <i class='bx bxs-grid-alt duration-200 bx-md text-c-dark' @click="toggleMobileNav" :class="{'icon-active': mobileNav}"></i>
                </div>

                <Transition name="mobile-nav">
                    <div v-show="mobileNav" class="slide backdrop-blur-md w-full fixed top-0 bottom-0 left-0 bg-opaque-light p-5 text-c-dark">
                        <div class="m-auto">
                            <i class='bx bx-x duration-200 bx-md text-c-red' @click="toggleMobileNav"></i>
                        </div>
                        <div class="flex flex-col">
                            <div class="">
                                <NuxtLink to="/"><img class="w-40 mx-auto my-2 duration-200 mobile-btn" src="/assets/logo.png" alt=""></NuxtLink>
                            </div>

                            <div class="flex flex-col text-center mt-10 text-c-light">
                                <NuxtLink class="w-80 m-auto py-2 px-5 my-2 rounded-full bg-gradient-to-bl from-blue-dark to-blue-light duration-200 mobile-btn capitalize" to="/connection/" v-if="!isLogged">connexion <i class='bx bxs-right-arrow-alt bx-sm'></i></NuxtLink>
                                <NuxtLink class="w-80 m-auto py-2 px-5 my-2 rounded-full bg-gradient-to-bl from-blue-dark to-blue-light duration-200 mobile-btn capitalize" to="/accounts/" v-if="isLogged">espace <i class='bx bxs-user bx-sm'></i></NuxtLink>
                                <button class="w-80 m-auto py-2 px-5 my-2 bg-c-red rounded-full duration-200 mobile-btn capitalize" @click="logout" v-if="isLogged">déconnexion <i class='bx bx-log-out-circle bx-sm'></i></button>
                            </div>

                            <div class="flex flex-col text-start">
                                <NuxtLink class="w-80 m-auto py-2 px-5 my-2 duration-200 mobile-btn capitalize" to="/accompagnement-digital/"><i class='bx bxs-network-chart bx-sm'></i> réseaux sociaux</NuxtLink>
                                <NuxtLink class="w-80 m-auto py-2 px-5 my-2 duration-200 mobile-btn capitalize" to="/graphisme/"><i class='bx bxs-palette bx-sm'></i> graphisme</NuxtLink>
                                <NuxtLink class="w-80 m-auto py-2 px-5 my-2 duration-200 mobile-btn capitalize" to="/creation-sites/"><i class='bx bx-code-block bx-sm'></i> creations web</NuxtLink>
                            </div>
                        </div>
                    </div>
                </Transition>
            </nav>
        </header>



        <slot/>



        <footer class="bg-c-light text-center text-c-dark">
            <div class="flex flex-row justify-center">
                <img class="w-24 m-2" src="/assets/logo.png" alt="copyright logo">
                <p class="my-auto text-xs">Copyright &copy; {{ year }}</p>
            </div>
        </footer>
    </div>
</template>

<style scoped>
nav, .slide{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
.scrolled-nav{
    margin: 0;
    border-radius: 0;
    background: #ffffff;
}

.mobile-nav-enter-active, .mobile-nav-leave-active {
	transition: 1s ease all;
}
.mobile-nav-enter-from, .mobile-nav-leave-to {
	transform: translateX(-100%);
}
.mobile-nav-enter-to {
	transform: translateX(0);
}
.icon-active{
	transform: rotate(180deg);
}
.desktop-header-padding{
    padding-top: 20px;
}
</style>