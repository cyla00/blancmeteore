<script setup lang="ts">
import axios from 'axios'
import Popup from '@/components/Popup.vue';

const showCheckout = ref<boolean>(false)
const show = ref<boolean>(false)
const errMsg = ref<string>('')
const succMsg = ref<string>('')

const continueOrder = async () => {
    const order_data = JSON.parse(localStorage.getItem('graphisme'))

    const body = {
        newLogo: order_data.logo,
        newCarteVisite: order_data.Cartes_visite,
        newFlyer: order_data.Flyer,
        newDeplyant: order_data.Depliant,
        newDeclinaisonResaux: order_data.declinaison_resaux_sociaux,
        newIdGraphComplete: order_data.complete,
        questDejaIdGraph: order_data.have_id,
        questSecteurActivite: order_data.sector,
        questObjectiveCreation: `${order_data.objective} - ${order_data.objective_autres}`,
        oldLogo: order_data.oldLogo, 
    }

    const auth = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        }
    }

    await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
        if(res.status === 200){
            await axios.post('http://localhost:3000/api/create-id-graphic', body, auth).then((res) => {
                if(res.status === 200){
                    show.value = true
                    succMsg.value = res.data.SuccMsg
                    localStorage.removeItem('graphisme')
                    setTimeout(() => {
                        return window.location.reload()
                    }, 2000)
                }
            }).catch((e) => {
                localStorage.removeItem('order')
                show.value = true
                errMsg.value = e.response.data.ErrMsg
                setTimeout(() => {
                    return window.location.reload()
                }, 2000)
            })
        }
    }).catch((e) => {
        show.value = true
        errMsg.value = e.response.data.ErrMsg
        setTimeout(() => {
            return window.location.href = '/connection'
        }, 2000)
    })
}

const removeOrder = () => {
    if(confirm('remove order?')){
        showCheckout.value = false
        return localStorage.removeItem('graphisme')
    }
    return
}

onMounted(() => {
    if(localStorage.getItem('graphisme')){
        showCheckout.value = true
    }
})

</script>

<template>
    <Teleport to="body">
    <Transition name="slide-fade">
    <div v-if="showCheckout"
    class="wrapper fixed left-0 bottom-5 z-50 text-base font-semibold px-10 py-5 text-c-dark rounded-md min-w-96 max-md:text-sm max-md:bottom-0 max-md:min-w-full bg-c-yellow">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <p>finaliser votre commande</p>
        <button @click="continueOrder" class="desktop-btn duration-200 capizalize text-c-dark bg-c-green py-2 px-5 rounded-full">proc??der</button>
        <button @click="removeOrder" class="desktop-btn duration-200 capizalize text-c-dark bg-c-red py-2 px-5 rounded-full">supprimer la commande</button>
    </div>
    </Transition>
    </Teleport>
</template>

<style scoped>
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.wrapper{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 99;
}
</style>