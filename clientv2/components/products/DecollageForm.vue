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

const id_graph = ref<string>('')
const sector = ref<string>('')
const objectives = ref<string>('')
const objectives_autre = ref<string>('')
const facebook = ref<boolean>(false)
const instagram = ref<boolean>(false)
const tiktok = ref<boolean>(false)
const linkedin = ref<boolean>(false)
const fb_url = ref<string>('')
const ig_url = ref<string>('')
const tk_url = ref<string>('')
const li_url = ref<string>('')
const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')
const emptyMsg = ref<string>('remplir avant de continuer')
const logMsg = ref<string>('connectez-vous avant de continuer')

const next2 = () => {
    if(id_graph.value === '' || sector.value === ''){
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
    if(fb_url.value === '' && ig_url.value === '' && tk_url.value === '' && li_url.value === '' && objectives.value === '' && objectives_autre.value === ''){
        show.value = true
        return errMsg.value = emptyMsg.value
    }

    if(!localStorage.getItem('token')){
        show.value = true
        errMsg.value = logMsg.value
        const obj = {
            type: 'decollage',
            id_graph: id_graph.value,
            sector: sector.value,
            objectives: objectives.value,
            objectives_autre: objectives_autre.value,
            facebook: facebook.value,
            instagram: instagram.value,
            tiktok: tiktok.value,
            linkedin: linkedin.value,
            fb_url: fb_url.value,
            ig_url: ig_url.value,
            tk_url: tk_url.value,
            li_url: li_url.value,
        }
        localStorage.setItem('order', JSON.stringify(obj))
        setTimeout(() => {
            return window.location.href = '/connection'
        }, 2000)
    }

    const auth = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    const body = {
        type: 'decollage',
        questDejaIdGraph: id_graph.value,
        questSecteurActivite: sector.value,
        questObjectiveCreation: `${objectives.value} - ${objectives_autre.value}`,
        instagram: instagram.value,
        facebook: facebook.value,
        linkedin: linkedin.value,
        tiktok: tiktok.value,
        linkInstagram: ig_url.value,
        linkFacebook: fb_url.value,
        linkLinkedin: li_url.value,
        linkTiktok: tk_url.value,
    }

    await axios.post('http://localhost:3000/api/jwt-check', body, auth).then(async (res) => {
        if(res.status === 200){
            await axios.post('http://localhost:3000/api/create-subscription', body, auth).then((res) => {
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
    <div v-if="open" class="popup fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-light h-4/5 w-4/5 z-40 p-10 text-c-dark rounded-xl">
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
                    <h3>possedez une identite graphique?</h3>
                    <div>
                        <input type="radio" name="pas_encore" value="pas encore" v-model="id_graph">
                        <label for="pas_encore">pas encore</label>
                    </div>
                        
                    <div>
                        <input type="radio" name="logo_uniquement" value="logo uniquement" v-model="id_graph">
                        <label for="logo_uniquement">logo uniquement</label>
                    </div>
                        
                    <div>
                        <input type="radio" name="oui" value="Identite graphique complete" v-model="id_graph">
                        <label for="oui">Identite graphique complete</label>
                    </div>

                    <div>
                        <label for="">votre secteur d'activite</label>
                        <input type="text" name="" id="" v-model="sector">
                    </div>
                        
                    <button @click="next2" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">suite</button>
                </div>
            </Transition>

            <Transition name="card">
                <div v-if="open2" class="">
                    
                    <h3>objectifs</h3>
                    <div>
                        <input type="radio" name="lancer" value="lancer mon activite" v-model="objectives">
                        <label for="lancer">lancer mon activite</label>
                    </div>
                        
                    <div>
                        <input type="radio" name="repenser" value="repenser mon identite existante" v-model="objectives">
                        <label for="repenser">repenser mon identite existante</label>
                    </div>
                        
                    <div>
                        <input type="text" name="autre" placeholder="Autre" v-model="objectives_autre">
                    </div>

                    <h3>quels reseaux</h3>
                    <div>
                        <input type="checkbox" name="fb" v-model="facebook">
                        <label for="fb"><i class='bx bxl-facebook' ></i> Facebook</label>
                        <Transition>
                            <div v-if="facebook">
                                <input type="text" v-model="fb_url" placeholder="facebook url">
                            </div>
                        </Transition>
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="instagram">
                        <label for="fb"><i class='bx bxl-instagram' ></i> Instagram</label>
                        <Transition>
                            <div v-if="instagram">
                                <input type="text" v-model="ig_url" placeholder="instagram url">
                            </div>
                        </Transition>
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="tiktok">
                        <label for="fb"><i class='bx bxl-tiktok' ></i> TikTok</label>
                        <Transition>
                            <div v-if="tiktok">
                                <input type="text" v-model="tk_url" placeholder="tiktok url">
                            </div>
                        </Transition>
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="linkedin">
                        <label for="fb"><i class='bx bxl-linkedin' ></i> LinkdIn</label>
                        <Transition>
                            <div v-if="linkedin">
                                <input type="text" v-model="li_url" placeholder="linkedin url">
                            </div>
                        </Transition>
                    </div>

                    <button @click="back1" class="desktop-btn duration-200 capizalize text-c-light bg-c-yellow py-2 px-5 rounded-full">retour</button>
                    <button @click="submit" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">envoyer</button>
                </div>
            </Transition>
        </div>

        
        
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

.popup{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>