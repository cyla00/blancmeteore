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

const objectives = ref<string>()
const objectives_autre = ref<string>()
const fb_url = ref<string>()
const ig_url = ref<string>()
const tk_url = ref<string>()
const li_url = ref<string>()
const errMsg = ref<string>()
const succMsg = ref<string>()
const show = ref<boolean>(false)
const emptyMsg = ref<string>('remplir avant de continuer')
const logMsg = ref<string>('connectez-vous avant de continuer')
const infoSuppl = ref<string>()


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
                <button @click="next2">suite</button>
            </div>
            </Transition>

            <Transition name="card">
            <div v-if="open2" class="">

                <h3>liens votres profils reseaux</h3>
                <div>
                    <input type="text" name="" v-model="fb_url" placeholder="facebook url">
                </div>

                <div>
                    <input type="text" name="" v-model="ig_url" placeholder="instagram url">
                </div>

                <div>
                    <input type="text" name="" v-model="tk_url" placeholder="tiktok url">
                </div>

                <div>
                    <input type="text" name="" v-model="li_url" placeholder="linkedin url">
                </div>

                <h3>infos supplementaires (facultatif)</h3>
                <div>
                    <textarea name="" id="" cols="30" rows="10" v-model="infoSuppl"></textarea>
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