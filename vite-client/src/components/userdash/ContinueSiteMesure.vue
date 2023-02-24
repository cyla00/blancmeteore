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
            const order_data = JSON.parse(localStorage.getItem('site-mesure'))
            
            const body = {
                questDejaSite: order_data.have_site,
                questSecteurActivite: order_data.sector,
                questObjectiveSite: order_data.objectives,
                questNumUsers: order_data.n_users,
                newMoreInfo: order_data.infos,
            }

            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-site-mesure', body, auth).then((res) => {
                        if(res.status === 200){
                            this.show = true
                            this.succMsg = res.data.SuccMsg
                            localStorage.removeItem('site-mesure')
                            return window.location.reload()
                        }
                    }).catch((e) => {
                        localStorage.removeItem('site-mesure')
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
                return localStorage.removeItem('site-mesure')
            }
            return
        }
    },
    created(){
        if(localStorage.getItem('site-mesure')){
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
