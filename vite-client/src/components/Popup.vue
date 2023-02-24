<script lang="ts">

import { defineComponent, watch } from 'vue'
export default defineComponent({
    name: 'Popup',
    props: {
        Show: Boolean,
        ErrMsg: String,
        SuccMsg: String,
    },
    setup(props, {emit}){
        watch(() => props.Show, () => {
            if(props.Show) {
                setTimeout(() => {
                emit("update:Show", false)
                emit("update:ErrMsg", '')
                emit("update:SuccMsg", '')
                }, 1000)
            }
        })
    }
})
</script>


<template>
<Teleport to="body">
<meta name="section popup" content="popup messages d'erreur et succes">
<Transition name="slide-fade">
    <div id="wrapper" v-if="Show">
        <p id="err" v-if="ErrMsg">{{ErrMsg}}</p>
        <p id="succ" v-if="SuccMsg">{{SuccMsg}}</p>
    </div>
</Transition>
</Teleport>
</template>

<style scoped>
#wrapper{
    position: fixed;
    top: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 99;
    font-size: 1rem;
    background-color: #ffffff;
    padding-inline: 10em;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: bold;
    font-family: Poppins;
}
#err{
 color: #FF605C;
}
#succ{
 color: #00CA4E;    
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
@media only screen and (max-width: 1000px){
  #wrapper{
      position: fixed;
      top: 0;
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      background-color: #ffffff;
      padding-block: 0.5em;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      font-weight: bold;
  }
}
@media only screen and (max-width: 650px){
  #wrapper{
      position: fixed;
      top: 0;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      background-color: #ffffff;
      padding-block: 0.5em;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      font-weight: bold;
  }
}
</style>