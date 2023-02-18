<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        open: Boolean,
    },
    data() {
        return{
            logo: false,
            Cartes_visite: false,
            Flyer: false,
            Depliant: false,
            declinaison_resaux_sociaux: false,
            complete: false,
            have_id: false,
            sector: '',
            objective: '',
            objective_autres: '',
        }
    },
})
</script>

<template>
    <Teleport to="body">
        <Transition>
        <div class="wrapper" v-if="open">
            <button class="close-btn" @click="this.$emit('update:open', false)"><i class='bx bx-x'></i></button>
            <div class="form-wrapper">


                <div class="quest" id="1">
                    <div class="inner-quest">
                        <h3>type</h3>

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

                    </div>
                    <a href="#2">next</a>
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

                    </div>
                    <a href="#">send</a>
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