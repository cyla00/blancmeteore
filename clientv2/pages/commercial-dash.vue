<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'
import More from '@/components/commDash/More.vue'

const toContact = ref<unknown>(undefined)
const signedProposition = ref<unknown>(undefined)
const sentProposition = ref<unknown>(undefined)
const inProgress = ref<unknown>(undefined)
const completed = ref<unknown>(undefined)
const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')

const openModal = ref<boolean>(false)
const order_id = ref<object>({})


const openCard = async (id:object) => {
    console.log(toRaw(id));
    
    order_id.value = Object(toRaw(id))
    openModal.value = true
}

onMounted( async () => {
    const auth = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        }
    }

    await axios.post('http://localhost:3000/api/get-orders', {}, auth).then((res) => {
        console.log(res.data)
        toContact.value = res.data.toContact
        signedProposition.value = res.data.signedProposition
        sentProposition.value = res.data.sentProposition
        inProgress.value = res.data.inProgress
        completed.value = res.data.completed
    }).catch((e) => {
        show.value = true
        errMsg.value = e.response.data.ErrMsg
    })
})
</script>

<template>
    <main class="h-vh90 grid grid-flow-col text-center text-sm text-c-dark">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
            <More v-model:openModal="openModal" :order_id="order_id"/>
            <div class="overflow-scroll">
                <h4 class="font-semibold text-base">a contacter</h4>
                <div v-for="i in toContact" :key="i" class="bg-c-cont my-5 rounded-md w-3/4 m-auto">
                    <h4 class="font-semibold">{{ i.type }}</h4>
                    <p class="">{{ i.createdAt }}</p>
                    <div class="">
                        <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="overflow-scroll">
                <h4 class="font-semibold text-base">proposition envoyée</h4>
                <div v-for="i in sentProposition" :key="i" class="bg-c-env my-5 rounded-md w-3/4 m-auto">
                    <h4 class="font-semibold">{{ i.type }}</h4>
                    <p class="">{{ i.createdAt }}</p>
                    <div>
                        <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="overflow-scroll">
                <h4 class="font-semibold text-base">en cours de retour client</h4>
                <div v-for="i in inProgress" :key="i" class="bg-c-yellow my-5 rounded-md w-3/4 m-auto">
                    <h4 class="font-semibold">{{ i.type }}</h4>
                    <p class="">{{ i.createdAt }}</p>
                    <div class="">
                        <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="overflow-scroll">
                <h4 class="font-semibold text-base">proposition signée</h4>
                <div v-for="i in signedProposition" :key="i" class="bg-c-sign my-5 rounded-md w-3/4 m-auto">
                    <h4 class="font-semibold">{{ i.type }}</h4>
                    <p class="">{{ i.createdAt }}</p>
                    <div class="">
                        <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="overflow-scroll">
                <h4 class="font-semibold text-base">complété</h4>
                <div v-for="i in completed" :key="i" class="bg-c-green my-5 rounded-md w-3/4 m-auto">
                    <h4 class="font-semibold">{{ i.type }}</h4>
                    <p class="">{{ i.createdAt }}</p>
                    <div class="">
                        <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                    </div>
                </div>
            </div>
    </main> 
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>