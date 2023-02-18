<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        open: Boolean,
    },
    data() {
        return{
            have_site: '',
            site_url: '',
            objectives: '',
            id_graph: '',
            n_users: '',
            infos: '',
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
                        <h3>possedex deja un site?</h3>

                        <div>
                            <input type="radio" name="oui" value="oui" v-model="have_site">
                            <label for="oui">oui</label>

                            <input type="radio" name="non" value="non" v-model="have_site">
                            <label for="non">non</label>
                        </div>
                            
                        <Transition>
                        <div v-if="have_site === 'oui'">
                            <input type="text" name="url" v-model="site_url" placeholder="url site">
                        </div>
                        </Transition>

                        <div>
                            <label for="">votre secteur d'activite</label>
                            <input type="text" name="" id="">
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
                        
                    </div>
                    <a href="#2">next</a>
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
                            <input type="radio" value="plus de 5" v-model="n_users">
                            <label for="">plus de 40</label>
                        </div>

                        <div>
                            <input type="radio" value="je ne sais pas" v-model="n_users">
                            <label for="">je ne sais pas</label>
                        </div>
                        
                        <div>
                            <textarea name="" id="" cols="30" rows="10" placeholder="autre infos a transmettre" v-model="infos"></textarea>
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