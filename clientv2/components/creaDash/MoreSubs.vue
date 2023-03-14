<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'

const prop = defineProps({
    openModal: {default: false, type: Boolean},
    order_id: {type: Object},
})

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const companyName = ref<string>('')
const siret = ref<string>('')
const tel = ref<string>('')
const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')

const emit = defineEmits(['update:openModal'])

const auth = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

watch(prop, async (event) => {
    if(event.openModal){
        const body = {
            clientId: toRaw(event.order_id)?.clientId
        }

        await axios.post('http://localhost:3000/api/get-user', body, auth).then((res) => {
            firstName.value = res.data.firstName,
            lastName.value = res.data.lastName
            email.value = res.data.email
            companyName.value = res.data.companyName
            siret.value = res.data.siret
            tel.value = res.data.tel
        }).catch((e) => {
            console.log(e)
        }) 
    }
    if(!event){
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        companyName.value = ''
        siret.value = ''
        tel.value = ''
    }
})
</script>

<template>
    <Transition>
    <div v-if="openModal" class="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-c-light text-c-dark py-10 px-2 overflow-scroll z-50 text-xs max-md:w-full max-md:h-full">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />

        <div class="max-md:flex max-md:flex-col mt-10">
            <button @click="emit('update:openModal', false)" class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full max-md:my-2"><i class='bx bx-x bx-xs'></i> Retour</button>
        </div>


        


    </div>
    </Transition>
</template>

<style scoped>
.modal{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

p{ 
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #062C43;
}

.no-graph{
    background: rgba(255, 0, 0, 0.5);
}
.yes-graph{
    background: rgb(0, 128, 0, 0.5);
}
</style>