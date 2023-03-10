<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'
import More from '@/components/commDash/More.vue'

definePageMeta({
  middleware: ["commercial"]
})

const toContact = ref<Array<object>>([{}])
const signedProposition = ref<Array<object>>([{}])
const sentProposition = ref<Array<object>>([{}])
const inProgress = ref<Array<object>>([{}])
const completed = ref<Array<object>>([{}])
const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')

const openModal = ref<boolean>(false)
const order_id = ref<object>({})


const openCard = async (id:object) => {
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

    await axios.post('http://localhost:3000/api/get-orders', {}, auth).then(async (res) => {
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
    <main class="min-h-screen grid grid-flow-row text-center text-sm text-c-dark">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
            <More v-model:openModal="openModal" :order_id="order_id"/>
            <h4 class="font-semibold text-base my-2 capitalize text-c-light">a contacter</h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in toContact" :key="i" class="bg-c-cont m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <h4 class="font-semibold text-base my-2 capitalize text-c-light">proposition envoyée <i class='bx bxs-send bx-xs'></i></h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in sentProposition" :key="i" class="bg-c-env m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div>
                            <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <h4 class="font-semibold text-base my-2 capitalize text-c-light">en cours de retour client <i class='bx bx-loader-circle bx-xs'></i></h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in inProgress" :key="i" class="bg-c-yellow m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <h4 class="font-semibold text-base my-2 capitalize text-c-light">proposition signée <i class='bx bx-edit bx-xs'></i></h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in signedProposition" :key="i" class="bg-c-sign m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
                    </div>
                </div>
                
            </div>

            <h4 class="font-semibold text-base my-2 capitalize text-c-light">complété <i class='bx bxs-check-shield bx-xs'></i></h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in completed" :key="i" class="bg-c-green m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openCard(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
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