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

const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')
const emptyMsg = ref<string>('remplir avant de continuer')
const logMsg = ref<string>('connectez-vous avant de continuer')

const have_site = ref<string>('')
const sector = ref<string>('')
const objectives = ref<string>('')
const n_users = ref<string>('')
const infos = ref<string>('')


const next2 = () => {
    if(have_site.value === '' || objectives.value === '' || sector.value === ''){ 
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
    if(n_users.value === ''){
        show.value = true
        return errMsg.value = emptyMsg.value
    }

    if(!localStorage.getItem('token')){
        show.value = true
        errMsg.value = logMsg.value
        const obj = {
            have_site: have_site.value,
            sector: sector.value,
            objectives: objectives.value,
            n_users: n_users.value,
            infos: infos.value,
        }
        localStorage.setItem('site-mesure', JSON.stringify(obj))
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
        questDejaSite: have_site.value,
        questSecteurActivite: sector.value,
        questObjectiveSite: objectives.value,
        questNumUsers: n_users.value,
        newMoreInfo: infos.value,
    }

    await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
        if(res.status === 200){
            await axios.post('http://localhost:3000/api/create-site-mesure', body, auth).then((res) => {
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
            <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
            <div class="flex">
                <button 
                    @click="closeForm" 
                    class="desktop-btn duration-200 capizalize text-c-light bg-c-red py-2 px-5 rounded-full">
                    <i class='bx bx-x bx-sm'></i>
                    fermer
                </button>
            </div>


            <Transition>
                <div v-if="open1">
                    <h3>possedex deja une platforme?</h3>
                    <div>
                        <input type="radio" name="oui" value="oui" v-model="have_site">
                        <label for="oui">oui</label>

                        <input type="radio" name="non" value="non" v-model="have_site">
                        <label for="non">non</label>
                    </div>

                    <div>
                        <label for="">votre secteur d'activite</label>
                        <input type="text" v-model="sector">
                    </div>
                            
                    <h3>objectifs</h3>
                    <div>
                        <input type="radio" name="lancer" value="lancer mon activite" v-model="objectives">
                        <label for="lancer">lancer mon activite</label>
                    </div>
                        
                    <div>
                        <input type="radio" name="amelliorer" value="amelliorer site existant" v-model="objectives">
                        <label for="amelliorer">amelliorer site existant</label>
                    </div>
                        
                    <div>
                        <input type="radio" name="connaitre" value="me faire connaitre" v-model="objectives">
                        <label for="connaitre">me faire connaitre</label>
                    </div>
                    <button @click="next2" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">suite</button>
                </div>
            </Transition>


            <Transition>
                <div v-if="open2">
                    <h3>combien d'utilisateurs pourront utiliser le site</h3>
                        <div>
                            <input type="radio" value="1 a 10" v-model="n_users">
                            <label for="">1 a 10</label>
                        </div>

                        <div>
                            <input type="radio" value="10 a 40" v-model="n_users">
                            <label for="">10 a 40</label>
                        </div>

                        <div>
                            <input type="radio" value="plus de 40" v-model="n_users">
                            <label for="">plus de 40</label>
                        </div>

                        <div>
                            <input type="radio" value="je ne sais pas" v-model="n_users">
                            <label for="">je ne sais pas</label>
                        </div>

                        <div>
                            <textarea name="" id="" cols="30" rows="10" placeholder="autre infos a transmettre" v-model="infos"></textarea>
                        </div>
                    <button @click="back1" class="desktop-btn duration-200 capizalize text-c-light bg-c-yellow py-2 px-5 rounded-full">retour</button>
                    <button @click="submit" class="desktop-btn duration-200 capizalize text-c-light bg-c-green py-2 px-5 rounded-full">envoyer</button>
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