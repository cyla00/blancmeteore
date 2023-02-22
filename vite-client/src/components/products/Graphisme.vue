<script lang="ts">
import { defineComponent } from 'vue'
import Popup from '../Popup.vue'
import axios from 'axios'

export default defineComponent({
    props: {
        open: Boolean,
    },
    components: {
        Popup
    },
    data() {
        return{
            oldLogo: undefined,
            logo: false,
            Cartes_visite: false,
            Flyer: false,
            Depliant: false,
            declinaison_resaux_sociaux: false,
            complete: false,
            have_id: '',
            sector: '',
            objective: '',
            objective_autres: '',
            show: false,
            errMsg: '',
            succMsg: '',
            emptyMsg: 'remplir avant de continuer',
            logMsg: 'connectez-vous avant de continuer',
        }
    },
    methods: {
        next1(){
            if(!this.logo && !this.Cartes_visite && !this.Flyer && !this.Depliant && !this.declinaison_resaux_sociaux && !this.complete){
                this.show = true
                return this.errMsg = this.emptyMsg
            }
            document.getElementById('2').scrollIntoView()
        },
        previewFiles(event){
            this.oldLogo = event.target.files
        },
        async sendOrder(){
            if(this.have_id === '' || this.sector === '' || this.objective === '' && this.objective_autres === ''){
                this.show = true
                return this.errMsg = this.emptyMsg
            }
            if(!localStorage.getItem('token')){
                this.show = true
                this.errMsg = this.logMsg
                const obj = {
                    oldLogo: this.oldLogo,
                    logo: this.logo,
                    Cartes_visite: this.Cartes_visite,
                    Flyer: this.Flyer,
                    Depliant: this.Depliant,
                    declinaison_resaux_sociaux: this.declinaison_resaux_sociaux,
                    complete: this.complete,
                    have_id: this.have_id,
                    sector: this.sector,
                    objective: this.objective,
                    objective_autres: this.objective_autres,
                }
                localStorage.setItem('graphisme', JSON.stringify(obj))
                setTimeout(() => {
                    return window.location.href = '/login'
                }, 1000)
            }

            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                }
            }

            const body = {
                newLogo: this.logo,
                newCarteVisite: this.Cartes_visite,
                newFlyer: this.Flyer,
                newDeplyant: this.Depliant,
                newDeclinaisonResaux: this.declinaison_resaux_sociaux,
                newIdGraphComplete: this.complete,
                questDejaIdGraph: this.have_id,
                questSecteurActivite: this.sector,
                questObjectiveCreation: `${this.objective} - ${this.objective_autres}`,
                oldlogo: this.oldLogo,
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then(async (res) => {
                if(res.status === 200){
                    await axios.post('http://localhost:3000/api/create-id-graphic', body, auth).then((res) => {
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
            console.log(this.oldLogo)
            
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
                        <h3>type</h3>

                        <div>
                            <label for="">your current logo</label>
                            <input type="file" accept="image/*" @change="previewFiles">
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="logo">
                            <label for="">logo</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Cartes_visite">
                            <label for="">Cartes_visite</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Flyer">
                            <label for="">Flyer</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="Depliant">
                            <label for="">Depliant</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="declinaison_resaux_sociaux">
                            <label for="">declinaison_resaux_sociaux</label>
                        </div>

                        <div>
                            <img src="" alt="">
                            <input type="checkbox" v-model="complete">
                            <label for="">complete</label>
                        </div>
                        <button @click="next1">next</button>
                    </div>
                </div>
                
                <div class="quest" id="2">
                    <a href="#1">back</a>
                    <div class="inner-quest">
                        <div>
                            <label for="">possedex deja une id graphique</label>
                            
                            <input type="radio" name="" value="oui" v-model="have_id">
                            <label for="">oui</label>
                            <input type="radio" name="" value="non" v-model="have_id">
                            <label for="">non</label>
                        </div>

                        <div>
                            <p for="">secteur d'activite</p>
                            <input type="text" name="" v-model="sector">
                        </div>

                        <div>
                            <p>objectifs crea</p>
                            <input type="radio" name="" value="lancer mon activite" v-model="objective">
                            <label for="">lancer mon activite</label>
                            <input type="radio" name="" value="repenser mon identite existante" v-model="objective">
                            <label for="">repenser mon identite existante</label>
                            <input type="test" name="" placeholder="autre" v-model="objective_autres">
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