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

let data = ref<object>({})

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


const setSentProposition = async() => {
    const body = {
        order_id: prop.order_id?.id
    }

    if(confirm('sur de vouloir continuer?')){
        await axios.post('http://localhost:3000/api/proposition-sent', body, auth).then((res) => {
            console.log(res.status)
            show.value = true
            succMsg.value = res.data.SuccMsg
            setTimeout(() => {
                return window.location.reload()
            }, 2000)
        }).catch((e) => {
            console.log(e)
            show.value = true
            errMsg.value = e.response.data.ErrMsg
        }) 
    }
    return
}
const setInProgress = async() => {
    const body = {
                order_id: prop.order_id?.id
            }

            if(confirm('sur de vouloir continuer?')){
                await axios.post('http://localhost:3000/api/order-in-progress', body, auth).then((res) => {
                    console.log(res.status)
                    show.value = true
                    succMsg.value = res.data.SuccMsg
                    setTimeout(() => {
                        return window.location.reload()
                    }, 2000)
                }).catch((e) => {
                    console.log(e)
                    show.value = true
                    errMsg.value = e.response.data.ErrMsg
                })
            }
            return
}
const setPropositionSigned = async() => {
    const body = {
        order_id: prop.order_id?.id
    }

    if(confirm('sur de vouloir continuer?')){
        await axios.post('http://localhost:3000/api/proposition-signed', body, auth).then((res) => {
            console.log(res.status)
            show.value = true
            succMsg.value = res.data.SuccMsg
            setTimeout(() => {
                return window.location.reload()
            }, 2000)
        }).catch((e) => {
            console.log(e)
            show.value = true
            errMsg.value = e.response.data.ErrMsg
        })
    }
    return
}
const setCompleted = async() => {
    const body = {
        order_id: prop.order_id?.id
    }
            
    if(confirm('sur de vouloir continuer?')){
        await axios.post('http://localhost:3000/api/order-completed', body, auth).then((res) => {
            console.log(res.status)
            show.value = true
            succMsg.value = res.data.SuccMsg
            setTimeout(() => {
                return window.location.reload()
            }, 2000)
        }).catch((e) => {
            console.log(e)
            show.value = true
            errMsg.value = e.response.data.ErrMsg
        })
    }
    return
}

</script> 

<template>
    <Transition>
    <div class="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-3/4 bg-c-light text-c-dark p-10 overflow-scroll z-50 text-xs" v-if="openModal">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <button @click="emit('update:openModal', false)" class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full"><i class='bx bx-x bx-xs'></i> Retour</button>
        <button @click="setSentProposition" class="desktop-btn duration-200 capizalize text-c-light bg-c-env py-2 px-5 rounded-full mx-1">Proposition envoye <i class='bx bxs-send bx-xs'></i></button>
        <button @click="setInProgress" class="desktop-btn duration-200 capizalize text-c-light bg-c-yellow py-2 px-5 rounded-full mx-1">En cours <i class='bx bx-loader-circle bx-xs' ></i></button>
        <button @click="setPropositionSigned" class="desktop-btn duration-200 capizalize text-c-light bg-c-sign py-2 px-5 rounded-full mx-1">Proposition signe <i class='bx bx-edit bx-xs' ></i></button>
        <button @click="setCompleted" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full mx-1">Complete <i class='bx bxs-check-shield bx-xs' ></i></button>
        
        <div class="text-start mt-10">
            <h3 class="text-center font-bold capitalize text-xl">{{ toRaw(order_id)?.type }}</h3>
            <p class="">{{ toRaw(order_id)?.createdAt }}</p>
            <p class="">{{ toRaw(order_id)?.status }}</p> 
            <table class="my-10 w-full">
                <tr class="grid grid-flow-col">
                    <th class="m-auto">Prenom</th>
                    <th class="m-auto">Nom</th>
                    <th class="m-auto">Email</th>
                    <th class="m-auto">Nom Societe</th>
                    <th class="m-auto">siret</th>
                    <th class="m-auto">N Tel</th>
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
            
            <h3 class="my-2 font-bold">creation sites</h3>
            <p><span class="font-semibold">Déjà un site</span> {{ toRaw(order_id)?.questDejaSite }}</p>
            <p><span class="font-semibold">url site existant</span> {{ toRaw(order_id)?.oldSiteUrl }}</p>
            <p><span class="font-semibold">Objectif</span> {{ toRaw(order_id)?.questObjectiveSite }}</p>
            <p><span class="font-semibold">Déjà une identite graphique:</span> {{ toRaw(order_id)?.questPossedezIdGraph }}</p>
            <p><span class="font-semibold">Num categories</span> {{ toRaw(order_id)?.questNumCategories }}</p>
            <p><span class="font-semibold">Num produits</span> {{ toRaw(order_id)?.questNumProducts }}</p>
            <p><span class="font-semibold">Num Pages</span> {{ toRaw(order_id)?.questNumPages }}</p>
            <p><span class="font-semibold">Num utilisateurs</span> {{ toRaw(order_id)?.questNumUsers }}</p>
            <p><span class="font-semibold">Autres infos</span> {{ toRaw(order_id)?.newMoreInfo }}</p>
        </div>
    
    </div>
    </Transition>
</template>


<style scoped>
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