<script lang="ts">

import { defineComponent } from 'vue'
import axios from 'axios'
import Popup from '../Popup.vue'

export default defineComponent({
    props: {
        open: Boolean,
    },
    components: {
        Popup,
    },
    data() {
        return{
            have_site: '',
            sector: '',
            objectives: '',
            id_graph: '',
            n_users: '',
            infos: '',
            show: false,
            errMsg: '',
            succMsg: '',
            emptyMsg: 'remplir avant de continuer',
            logMsg: 'connectez-vous avant de continuer',
        }
    },
    methods: {
        next1(){
            if(this.have_site === '' || this.objectives === '' || this.sector === ''){ 
                this.show = true
                return this.errMsg = this.emptyMsg
            }
            document.getElementById('2')?.scrollIntoView()
        },
        async sendOrder(){
            if(this.n_users === ''){
                this.show = true
                return this.errMsg = this.emptyMsg
            }

            if(!localStorage.getItem('token')){
                this.show = true
                this.errMsg = this.logMsg
                const obj = {
                    have_site: this.have_site,
                    sector: this.sector,
                    objectives: this.objectives,
                    n_users: this.n_users,
                    infos: this.infos,
                }
                localStorage.setItem('site-mesure', JSON.stringify(obj))
                setTimeout(() => {
                    return window.location.href = '/login'
                }, 1000)
            }

            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const body = {
                questDejaSite: this.have_site,
                questSecteurActivite: this.sector,
                questObjectiveSite: this.objectives,
                questNumUsers: this.n_users,
                newMoreInfo: this.infos,
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-site-mesure', body, auth).then((res) => {
                        if(res.status === 200){
                            this.show = true
                            this.succMsg = res.data.SuccMsg
                            return window.location.reload()
                        }
                    }).catch((e) => {
                        this.show = true
                        this.errMsg = e.response.data.ErrMsg
                        setTimeout(() => {
                            return window.location.reload()
                        }, 1000)
                    })
                }
            }).catch((e) => {
                this.show = true
                this.errMsg = this.logMsg
                setTimeout(() => {
                    return window.location.href = '/login'
                }, 1000)
            })
        }
    }
})
</script>

<template>
    <Teleport to="body">
        <Transition>
        <div class="wrapper" v-if="open">
            <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
            <button class="close-btn" @click="this.$emit('update:open', false)"><i class='bx bx-x'></i></button>
            <div class="form-wrapper">

                <div class="quest" id="1">
                    <div class="inner-quest">
                        <h3>possedex deja un site?</h3>

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
                        <button @click="next1">next</button>
                    </div>
                </div>
                
                <div class="quest" id="2">
                    <a href="#1">back</a>
                    <div class="inner-quest">

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
                        <button @click="sendOrder">send</button>
                    </div>
                </div>

            </div>
        </div>
        </Transition>
    </Teleport>
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

.form-wrapper::-webkit-scrollbar {
  display: none !important;
}

.form-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

i{
    vertical-align: middle;
}

.wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 10px;
    height: 80%;
    width: 90%;
    z-index: 99;
    padding: 10px;
}

.form-wrapper{
    height: 90%;
    width: 90%;
    overflow: hidden;
    margin: auto;
}
.quest{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.inner-quest{
    margin: auto;
    display: flex;
    flex-direction: column;
}
</style>