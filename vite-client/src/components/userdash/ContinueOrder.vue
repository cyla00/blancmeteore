<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Popup from '../Popup.vue'

const auth = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

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
            const order_data = JSON.parse(localStorage.getItem('order'))

            const body = {
                type: order_data.type,
                questDejaIdGraph: order_data.id_graph,
                questSecteurActivite: order_data.sector,
                questObjectiveCreation: `${order_data.objectives} - ${order_data.objectives_autre}`,
                instagram: order_data.instagram,
                facebook: order_data.facebook,
                linkedin: order_data.linkedin,
                tiktok: order_data.tiktok,
                linkInstagram: order_data.ig_url,
                linkFacebook: order_data.fb_url,
                linkLinkedin: order_data.li_url,
                linkTiktok: order_data.tk_url,
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-subscription', body, auth).then((res) => {
                        if(res.status === 200){
                            this.show = true
                            this.succMsg = res.data.SuccMsg
                            localStorage.removeItem('order')
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
                return localStorage.removeItem('order')
            }
            return
        }
    },
    created(){
        if(localStorage.getItem('order')){
            this.showCheckout = true
        }
    }
})
</script>

<template>
    <div v-if="showCheckout">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <p>continue your order</p>
        <button @click="continueOrder">proceed</button>
        <button @click="removeOrder">remove order</button>
    </div>
</template>

<style scoped>

</style>
