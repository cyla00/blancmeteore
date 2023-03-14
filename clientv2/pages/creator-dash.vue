<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'
import MoreSubs from '@/components/creaDash/MoreSubs.vue'
import MoreGraph from '@/components/creaDash/MoreGraph.vue'

definePageMeta({
  middleware: ["creator"]
})

const orders = ref<Array<object>>({})
const subs = ref<Array<object>>({})

const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')

const showGraph = ref<boolean>(false)
const showSub = ref<boolean>(false)
const order_id = ref<object>({})


const openGraph = async (id:object) => {
    order_id.value = Object(toRaw(id))
    showGraph.value = true
}

const openSub = async (id:object) => {
    order_id.value = Object(toRaw(id))
    showSub.value = true
}

onMounted( async () => {
    const auth = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }

    await axios.post('http://localhost:3000/api/get-creator-orders', {}, auth).then(async (res) => {
        orders.value = res.data.orders
        subs.value = res.data.subs    
        console.log(subs.value);
        
    }).catch((e) => {
        show.value = true
        errMsg.value = e.response.data.ErrMsg
    })
})
</script>

<template>
    <main class="min-h-screen text-center text-sm text-c-dark">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <MoreSubs v-model:openModal="showSub" :order_id="order_id"/>
        <MoreGraph v-model:openModal="showGraph" :order_id="order_id"/>

        <h4 class="font-semibold text-base my-2 capitalize">identite graphique</h4>
        <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in orders" :key="i" class="bg-c-cont m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openGraph(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
                        </div>
                    </div>
                </div>
            </div>


            <h4 class="font-semibold text-base my-2 capitalize">abbonements</h4>
            <div class="overflow-scroll flex flex-row">
                <div class="flex flex-row px-5">
                    <div v-for="i in subs" :key="i" class="bg-c-cont m-5 rounded-md w-64 py-5">
                        <h4 class="font-semibold">{{ i.type }}</h4>
                        <p class="text-xs">{{ i.createdAt }}</p>
                        <div class="">
                            <button @click="openSub(i)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full my-2">ouvrir</button>
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