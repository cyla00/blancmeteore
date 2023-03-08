<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue'

interface Props{
    open: boolean
}
const {open} = defineProps<Props>()

const emit = defineEmits(['update:open'])
const closeForm = () => {
    emit('update:open', false)
}

const open1 = ref<boolean>(true)
const open2 = ref<boolean>(false)

const oldLogo = ref<undefined>()
const logo = ref<boolean>(false)
const Cartes_visite = ref<boolean>(false)
const Flyer = ref<boolean>(false)
const Depliant = ref<boolean>(false)
const declinaison_resaux_sociaux = ref<boolean>(false)
const complete = ref<boolean>(false)
const have_id = ref<string>('')
const sector = ref<string>('')
const objective = ref<string>('')
const objective_autres = ref<string>('')

const errMsg = ref<string>('')
const succMsg = ref<string>('')
const show = ref<boolean>(false)
const emptyMsg = ref<string>('remplir avant de continuer')
const logMsg = ref<string>('connectez-vous avant de continuer')
const infoSuppl = ref<string>()


const previewFiles = (event:any) => {
    oldLogo.value = event.target.files
}

const next2 = () => {
    if(!logo.value && !Cartes_visite.value && !Flyer.value && !Depliant.value && !declinaison_resaux_sociaux.value && !complete.value){
        show.value = true
        return errMsg.value = emptyMsg.value
    }
    open1.value = false 
    open2.value = true
}

const back1 = () => {
    open1.value = true
    open2.value = false
}

const submit = async () => {
    if(have_id.value === '' || sector.value === '' || objective.value === '' && objective_autres.value === ''){
        show.value = true
        return errMsg.value = emptyMsg.value
    }
    if(!localStorage.getItem('token')){
        show.value = true
        errMsg.value = logMsg.value
        const obj = {
            oldLogo: oldLogo.value,
            logo: logo.value,
            Cartes_visite: Cartes_visite.value,
            Flyer: Flyer.value,
            Depliant: Depliant.value,
            declinaison_resaux_sociaux: declinaison_resaux_sociaux.value,
            complete: complete.value,
            have_id: have_id.value,
            sector: sector.value,
            objective: objective.value,
            objective_autres: objective_autres.value,
        }
        localStorage.setItem('graphisme', JSON.stringify(obj))
        setTimeout(() => {
            return window.location.href = '/connection'
        }, 2000)
    }

    const auth = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        }
    }

    const body = {
        newLogo: logo.value,
        newCarteVisite: Cartes_visite.value,
        newFlyer: Flyer.value,
        newDeplyant: Depliant.value,
        newDeclinaisonResaux: declinaison_resaux_sociaux.value,
        newIdGraphComplete: complete.value,
        questDejaIdGraph: have_id.value,
        questSecteurActivite: sector.value,
        questObjectiveCreation: `${objective.value} - ${objective_autres.value}`,
        oldlogo: oldLogo.value,
    }

    await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
        if(res.status === 200){
            await axios.post('http://localhost:3000/api/create-id-graphic', body, auth).then((res) => {
                if(res.status === 200){
                    show.value = true
                    succMsg.value = res.data.SuccMsg
                    setTimeout(() => {
                        return window.location.reload()
                    }, 2000)
                }
            }).catch((e) => {
                show.value = true
                errMsg.value = e.response.data.ErrMsg
                setTimeout(() => {
                    return window.location.reload()
                }, 2000)
            })
        }
    }).catch((e) => {
        show.value = true
        errMsg.value = logMsg.value
        setTimeout(() => {
            return window.location.href = '/connection'
        }, 2000)
    })
}

</script>

<template>
    <Transition>
        <div v-if="open" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-light h-full w-full z-40 p-10 text-c-dark">
            <div class="flex">
                <button 
                    @click="closeForm" 
                    class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full">
                    <i class='bx bx-x bx-sm'></i>
                    fermer
                </button>
            </div>

    <Transition>
    <div v-if="open" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-light h-full w-full z-40 p-10 text-c-dark">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <div class="flex">
            <button 
                @click="closeForm" 
                class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full">
                <i class='bx bx-x bx-sm'></i>
                fermer
            </button>
        </div>
             
        <div class="flex justify-center">

            <Transition name="card">
            <div v-if="open1" class="">
                <h3>type</h3>

                        <div>
                            <label for="">your current logo</label>
                            <input type="file" accept="image/*" @change="previewFiles">
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="logo">
                            <label for="">logo</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Cartes_visite">
                            <label for="">Cartes_visite</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Flyer">
                            <label for="">Flyer</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Depliant">
                            <label for="">Depliant</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="declinaison_resaux_sociaux">
                            <label for="">declinaison_resaux_sociaux</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="complete">
                            <label for="">complete</label>
                        </div>
                
                <button @click="next2" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">suite</button>
            </div>
            </Transition>

            <Transition name="card">
            <div v-if="open2" class="">
                <div>
                    <label for="">possedex deja une id graphique</label>       
                    <input type="radio" name="" value="oui" v-model="have_id">
                    <label for="">oui</label>
                    <input type="radio" name="" value="non" v-model="have_id">
                    <label for="">non</label>
                </div>

                <div>
                    <p for="">secteur d'activite</p>
                    <input type="text" name="" v-model="sector">
                </div>

                <div>
                    <p>objectifs crea</p>
                    <input type="radio" name="" value="lancer mon activite" v-model="objective">
                    <label for="">lancer mon activite</label>
                    <input type="radio" name="" value="repenser mon identite existante" v-model="objective">
                    <label for="">repenser mon identite existante</label>
                    <input type="test" name="" placeholder="autre" v-model="objective_autres">
                </div>
                

                <button @click="back1" class="desktop-btn duration-200 capizalize text-c-light bg-c-yellow py-2 px-5 rounded-full">retour</button>
                <button @click="submit" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">envoyer</button>
            </div>
            </Transition>

        </div>
    </div> 
    </Transition>
        </div>
    </Transition>
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