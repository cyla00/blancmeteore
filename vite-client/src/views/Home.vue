<script lang="ts">
import { defineComponent } from 'vue'
import Sec2 from '../components/home/sec2.vue'
import Sec3 from '../components/home/Sec3.vue'

export default defineComponent({
    name: 'Home',
    components: {
        Sec2,
        Sec3,
    }
})
</script>

<template>
    <section>
        <div class="container">
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                <path d="M0,150 C150,200 400,0 800,150 L500,00 L0,0 Z" style="stroke: none; fill:#EFEDF2;"></path>
            </svg>




            <div class="home-wrapper">
                <div class="into-image-wrapper">
                    <img class="intro-img" src="@/assets/ph.png" alt="">
                </div>

                <div class="intro-text-wrapper">
                    <p class="title-p">{{ $t('home.title-p') }}</p>
                    <h1 class="title">{{ $t('home.title') }}</h1>
                    <h3 class="sub-title">{{ $t('home.sub-title') }}</h3>
                </div>
            </div>
        </div>
        <Sec2/>
        <Sec3/>
    </section>
</template>

<style scoped>












section{
    position: relative;
}
.home-wrapper{
    height: 80vh;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 0px 2% 2% 2%;
    border-radius: 20px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.into-image-wrapper{
    margin: auto;
}
.intro-img{
    width: 500px;
}
.intro-text-wrapper{
    margin: auto;
    font-family: AvenirBold;
}
.title{
    font-size: 62px;
    margin: 0;
    text-transform: uppercase;
    color: #062C43;
}
.title-p{
    font-size: 15px;
    margin: 0;
    text-transform: capitalize;
    color: #7649FE;
}
.sub-title{
    font-size: 40px;
    margin: 0; 
    text-transform: capitalize;
    color: #062C43;    
}
svg {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
.container {
  display: inline-block;
  position: relative;
  width: 100%;
  vertical-align: middle;
  overflow: hidden;
  background: #062C43;
}
</style>