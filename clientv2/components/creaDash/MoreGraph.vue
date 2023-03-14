<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'
import { client } from 'process';

const prop = defineProps({
    openModal: {default: false, type: Boolean},
    order_id: {type: Object},
})

const oldLogo = ref<undefined>()
const media = ref<undefined>()
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

const previewFiles = (event:any) => {
    media.value = event.target.files
}

const uploadMedia = async (clientId:string) => {
    const authMulti = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        }
    }

    const body = {
        client_id: clientId,
        zipped: media.value,
    }
    console.log(body)
    

    await axios.post('http://localhost:3000/api/send-media', body, authMulti).then((res) => {
        show.value = true
        succMsg.value = res.data.SuccMsg
    }).catch((e) => {
        show.value = true
        errMsg.value = 'Le téléchargement a échoué'
    })
}
</script>

<template>
    <Transition>
    <div v-if="openModal" class="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-c-light text-c-dark py-10 px-2 overflow-scroll z-50 text-xs max-md:w-full max-md:h-full">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />

        <div class="text-start">
            <h3 class="text-center font-bold capitalize text-xl">{{ toRaw(order_id)?.type }}</h3>
            <p class="">{{ toRaw(order_id)?.createdAt }}</p>
            <p class="">{{ toRaw(order_id)?.status }}</p> 
            <table class="my-10 w-full">
                <tr class="grid grid-flow-col">
                    <th class="text-start">Prenom</th>
                    <th class="text-start">Nom</th>
                    <th class="text-start">Email</th>
                    <th class="text-start">Nom Societe</th>
                    <th class="text-start">siret</th>
                    <th class="text-start">N Tel</th>
                </tr>

                <tr class="grid grid-flow-col">
                    <td>{{ firstName }}</td>
                    <td>{{ lastName }}</td>
                    <td>{{ email }}</td>
                    <td>{{ companyName }}</td>
                    <td>{{ siret }}</td>
                    <td>{{ tel }}</td>
                </tr>
            </table>

            <p class=""><span class="font-semibold">Secteur d'activite: </span> {{ toRaw(order_id)?.questSecteurActivite }}</p>

            <h3 class="my-2 font-bold">identite graphique</h3>
            <p class=""><span class="font-semibold">Objectif: </span> {{ toRaw(order_id)?.questObjectiveCreation }}</p>
            <p class=""><span class="font-semibold">Déjà une identite graphique: </span> {{ toRaw(order_id)?.questDejaIdGraph }}</p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newLogo, 'yes-graph': toRaw(order_id)?.newLogo }"><span class="title">logo</span></p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newFlyer, 'yes-graph': toRaw(order_id)?.newFlyer }"><span class="title">flyer</span></p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newDeplyant, 'yes-graph': toRaw(order_id)?.newDeplyant }"><span class="title">deplyant</span></p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newCarteVisite, 'yes-graph': toRaw(order_id)?.newCarteVisite }"><span class="title">carte visite</span></p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newDeclinaisonResaux, 'yes-graph': toRaw(order_id)?.newDeclinaisonResaux }"><span class="title">declinaison resaux</span></p>
            <p class="font-semibold" :class="{'no-graph': !toRaw(order_id)?.newIdGraphComplete, 'yes-graph': toRaw(order_id)?.newIdGraphComplete }"><span class="title">identite complete</span></p>
        
            <div class="max-md:flex max-md:flex-col mt-10">
                <h3 class="my-2 font-bold">charger dossier zip avec creations <i class='bx bx-cloud-upload bx-xs'></i></h3>
                <input 
                    class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full max-md:my-2" 
                    type="file"
                    @change="previewFiles">

                <button @click="uploadMedia(toRaw(order_id)?.clientId)" class="desktop-btn duration-200 capizalize text-c-light bg-blue-light py-2 px-5 rounded-full max-md:my-2"> Continuer</button>
                <button @click="emit('update:openModal', false)" class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full max-md:my-2"><i class='bx bx-x bx-xs'></i> Retour</button>
            </div>

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