<script setup lang="ts">

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

const id_graph = ref<string>()
const sector = ref<string>()
const objectives = ref<string>()
const objectives_autre = ref<string>()
const facebook = ref<boolean>(false)
const instagram = ref<boolean>(false)
const tiktok = ref<boolean>(false)
const linkedin = ref<boolean>(false)
const fb_url = ref<string>()
const ig_url = ref<string>()
const tk_url = ref<string>()
const li_url = ref<string>()
const show = ref<boolean>(false)
const errMsg = ref<string>()
const succMsg = ref<string>()
const emptyMsg = ref<string>('remplir avant de continuer')
const logMsg = ref<string>('connectez-vous avant de continuer')


const next2 = () => {
    open1.value = false
    open2.value = true
}

const back1 = () => {
    open1.value = true
    open2.value = false
}

const submit = () => {

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
                        
                    <button @click="next2">suite</button>
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
                        <input type="text" v-if="facebook" v-model="fb_url" placeholder="facebook url">
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="instagram">
                        <label for="fb"><i class='bx bxl-instagram' ></i> Instagram</label>
                        <input type="text" v-if="instagram" v-model="ig_url" placeholder="instagram url">
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="tiktok">
                        <label for="fb"><i class='bx bxl-tiktok' ></i> TikTok</label>
                        <input type="text" v-if="tiktok" v-model="tk_url" placeholder="tiktok url">
                    </div>

                    <div>
                        <input type="checkbox" name="fb" v-model="linkedin">
                        <label for="fb"><i class='bx bxl-linkedin' ></i> LinkdIn</label>
                        <input type="text" v-if="linkedin" v-model="li_url" placeholder="linkedin url">
                    </div>

                    <button @click="back1">retour</button>
                    <button @click="submit">envoyer</button>
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
</style>