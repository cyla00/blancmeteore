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
            const order_data = JSON.parse(localStorage.getItem('order'))
            console.log(order_data);

            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const body = {
                type: 'lancement',
                questDejaIdGraph: order_data.id_graph,
                questSecteurActivite: order_data.sector,
                questObjectiveCreation: order_data.objectives && order_data.objectives_autre,
                instagram: order_data.instagram,
                facebook: order_data.facebook,
                linkedin: order_data.linkedin,
                tiktok: order_data.tiktok,
                linkInstagram: order_data.fb_url,
                linkFacebook: order_data.ig_url,
                linkLinkedin: order_data.tk_url,
                linkTiktok: order_data.li_url,
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-subscription', body, auth).then((res) => {
                        if(res.status === 200){
                            this.show = true
                            this.succMsg = res.data.SuccMsg
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
    <section v-if="showCheckout">
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <p>continue your order</p>
        <button @click="continueOrder">proceed</button>
    </section>
</template>

<style scoped>

</style>
