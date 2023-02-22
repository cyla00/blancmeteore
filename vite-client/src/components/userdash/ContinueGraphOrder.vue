<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Popup from '../Popup.vue'

export default defineComponent({
    components: {
        Popup,
    },
    data(){
        return{
            showCheckout: false,
            show: false,
            errMsg: '',
            succMsg: '',
        }
    },
    methods: {
        async continueOrder(){
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
                oldlogo: order_data.oldLogo,
            }

            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                }
            }

            await axios.post('http://localhost:3000/api/jwt-check', body, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-id-graphic', body, auth).then((res) => {
                        if(res.status === 200){
                            this.show = true
                            this.succMsg = res.data.SuccMsg
                            localStorage.removeItem('graphisme')
                            return window.location.reload()
                        }
                    }).catch((e) => {
                        localStorage.removeItem('order')
                        this.show = true
                        this.errMsg = e.response.data.ErrMsg
                        setTimeout(() => {
                            return window.location.reload()
                        }, 1000)
                    })
                }
            }).catch((e) => {
                this.show = true
                this.errMsg = e.response.data.ErrMsg
                setTimeout(() => {
                    return window.location.href = '/login'
                }, 1000)
            })
        },
        removeOrder(){
            if(confirm('remove order?')){
                this.showCheckout = false
                return localStorage.removeItem('graphisme')
            }
            return
        }
    },
    created(){
        if(localStorage.getItem('graphisme')){
            this.showCheckout = true
        }
    }
})
</script>

<template>
    <div v-if="showCheckout">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <p>continue graphisme order</p>
        <button @click="continueOrder">proceed</button>
        <button @click="removeOrder">remove order</button>
    </div>
</template>

<style scoped>

</style>
