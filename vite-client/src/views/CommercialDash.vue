<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Popup from '../components/Popup.vue'
import More from '../components/commercialdash/More.vue'

export default defineComponent({
    name: 'CommercialDash',
    components: {
        Popup,
        More,
    },
    data(){
        return{
            toContact: undefined,
            signedProposition: undefined,
            sentProposition: undefined,
            inProgress: undefined,
            completed: undefined,
            show: false,
            errMsg: '',
            succMsg: '',

            openModal: false,
            order_id: {},
        }
    },
    methods: {
        async openCard(order_id:string){
            this.order_id = order_id
            this.openModal = true
        }
    },
    async created(){

        const auth = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }
        }

        await axios.post('http://localhost:3000/api/get-orders', {}, auth).then((res) => {
            console.log(res.data)
            this.toContact = res.data.toContact
            this.signedProposition = res.data.signedProposition
            this.sentProposition = res.data.sentProposition
            this.inProgress = res.data.inProgress
            this.completed = res.data.completed
        }).catch((e) => {
            console.log(e)
            
        })
    }
})
</script>

<template>
    <section>
        <div class="order-wrapper">
            <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
            <More v-model:openModal="openModal" :order_id="order_id"/>
            <div class="col">
                <h4 class="col-title">a contacter</h4>
                <div v-for="i in toContact" :key="i" class="card">
                    <h4 class="card-title">{{ i.type }}</h4>
                    <p class="card-time">{{ i.createdAt }}</p>
                    <div class="btn-wrapper">
                        <button @click="openCard(i)">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4 class="col-title">proposition envoyée</h4>
                <div v-for="i in sentProposition" :key="i" class="card">
                    <h4 class="card-title">{{ i.type }}</h4>
                    <p class="card-time">{{ i.createdAt }}</p>
                    <div>
                        <button @click="openCard(i)">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4 class="col-title">en cours de retour client</h4>
                <div v-for="i in inProgress" :key="i" class="card">
                    <h4 class="card-title">{{ i.type }}</h4>
                    <p class="card-time">{{ i.createdAt }}</p>
                    <div class="btn-wrapper">
                        <button @click="openCard(i)">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4 class="col-title">proposition signée</h4>
                <div v-for="i in signedProposition" :key="i" class="card">
                    <h4 class="card-title">{{ i.type }}</h4>
                    <p class="card-time">{{ i.createdAt }}</p>
                    <div class="btn-wrapper">
                        <button @click="openCard(i)">ouvrir</button>
                    </div>
                </div>
            </div>

            <div class="col">
                <h4 class="col-title">complété</h4>
                <div v-for="i in completed" :key="i" class="card">
                    <h4 class="card-title">{{ i.type }}</h4>
                    <p class="card-time">{{ i.createdAt }}</p>
                    <div class="btn-wrapper">
                        <button @click="openCard(i)">ouvrir</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.order-wrapper{
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    color: #ffffff;
    text-align: center;
}

.col::-webkit-scrollbar {
  display: none;
}
.col{
    padding: 10px 20px;
    height: 90vh;
    overflow: scroll;
}

.col-title{
    color: #062C43;
}

.card{
    background: rgba(255, 255, 255, 0.8);
    color: #062C43;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 10px;
    text-align: start;
}
.card-title{
    margin: 0;
}
.card-time{
    margin: 0;
}
.btn-wrapper{
    width: 100%;
    text-align: center;
    margin: 5px 0;
}
.btn-wrapper button{
    padding: 5px 10px;
    border-radius: 100px;
    outline: none;
    border: 1px solid grey;
}
</style>