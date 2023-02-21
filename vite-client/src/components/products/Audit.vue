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
    props: {
        open: Boolean,
    },
    components: {
        Popup,
    }, 
    data() {
        return{
            objectives: '',
            objectives_autre: '',
            fb_url: '',
            ig_url: '',
            tk_url: '',
            li_url: '',
            errMsg: '',
            succMsg: '',
            emptyMsg: 'remplir avant de continuer',
            logMsg: 'connectez-vous avant de continuer',
            infoSuppl: '',
        }
    },
    methods: {
        next1(){
            if(this.objectives === '' && this.objectives_autre === ''){
                this.show = true
                return this.errMsg = this.emptyMsg
            }
            document.getElementById('2').scrollIntoView()
        },
        next2(){
            if(this.fb_url === '' && this.ig_url === '' && this.tk_url === '' && this.li_url === ''){
                this.show = true
                return this.errMsg = this.emptyMsg
            }
            document.getElementById('3').scrollIntoView()
        },
        async checkout(){
            if(!localStorage.getItem('token')){
                this.show = true
                this.errMsg = this.logMsg
                const obj = {
                    type: 'audit',
                    objectives: this.objectives,
                    objectives_autre: this.objectives_autre,
                    fb_url: this.fb_url,
                    ig_url: this.ig_url,
                    tk_url: this.tk_url,
                    li_url: this.li_url,
                    infoSuppl: this.infoSuppl,
                }
                localStorage.setItem('order', JSON.stringify(obj))
                setTimeout(() => {
                    return window.location.href = '/login'
                }, 1000)
            }

            const body = {
                type: 'audit',
                objectives: this.objectives,
                objectives_autre: this.objectives_autre,
                infoSuppl: this.infoSuppl,
                linkInstagram: this.ig_url,
                linkFacebook: this.fb_url,
                linkLinkedin: this.li_url,
                linkTiktok: this.tk_url,
            }

            await axios.post('http://localhost:3000/api/jwt-check', body, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-subscription', body, auth).then((res) => {
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
                        <button @click="next1">next</button>
                    </div>
                </div>
                
                <div class="quest" id="2">
                    <a href="#1">back</a>
                    <div class="inner-quest">
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
                        <button @click="next2">next</button>
                    </div>
                </div>

                <div class="quest" id="3">
                    <a href="#2">back</a>
                    <div class="inner-quest">
                        <h3>infos supplementaires (facultatif)</h3>
                        <div>
                            <textarea name="" id="" cols="30" rows="10" v-model="infoSuppl"></textarea>
                        </div>
                        <button @click="checkout">checkout</button>
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