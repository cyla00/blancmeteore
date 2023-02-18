<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        open: Boolean,
    },
    data() {
        return{
            id_graph: '',
            objectives: '',
            objectives_autre: '',
            facebook: false,
            instagram: false,
            tiktok: false,
            linkedin: false,
            fb_url: '',
            ig_url: '',
            tk_url: '',
            li_url: '',
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
                        <h3>possedez une identite graphique?</h3>
                        <div>
                            <input type="radio" name="pas_encore" value="pas encore" v-model="id_graph">
                            <label for="pas_encore">pas encore</label>
                        </div>
                        
                        <div>
                            <input type="radio" name="logo_uniquement" value="logo uniquement" v-model="id_graph">
                            <label for="logo_uniquement">logo uniquement</label>
                        </div>
                        
                        <div>
                            <input type="radio" name="oui" value="Identite graphique complete" v-model="id_graph">
                            <label for="oui">Identite graphique complete</label>
                        </div>

                    </div>
                    <a href="#2">next</a>
                </div>
                

                
                <div class="quest" id="2">
                    <a href="#1">back</a>
                    <div class="inner-quest">
                        

                        <label for="">votre secteur d'activite</label>
                        <input type="text" name="" id="">

                        
                    </div>
                    <a href="#3">next</a>
                </div>
                

                
                <div class="quest" id="3">
                    <a href="#2">back</a>
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

                    </div>
                    <a href="#4">next</a>
                </div>
                

                
                <div class="quest" id="4">
                    <a href="#3">back</a>
                    <div class="inner-quest">
                        <h3>quels reseaux</h3>
                        <div>
                            <input type="checkbox" name="fb" v-model="facebook">
                            <label for="fb"><i class='bx bxl-facebook' ></i> Facebook</label>
                        </div>

                        <div>
                            <input type="checkbox" name="fb" v-model="instagram">
                            <label for="fb"><i class='bx bxl-instagram' ></i> Instagram</label>
                        </div>

                        <div>
                            <input type="checkbox" name="fb" v-model="tiktok">
                            <label for="fb"><i class='bx bxl-tiktok' ></i> TikTok</label>
                        </div>

                        <div>
                            <input type="checkbox" name="fb" v-model="linkedin">
                            <label for="fb"><i class='bx bxl-linkedin' ></i> LinkdIn</label>
                        </div>
                    </div>
                    <a href="#5">next</a>
                </div>
                

                
                <div class="quest" id="5">
                    <a href="#4">back</a>
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
                        

                    </div>
                    <a href="#">pay</a>
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