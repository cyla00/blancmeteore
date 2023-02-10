<script lang="ts">
import { defineComponent } from 'vue'
import Sec2 from '../components/home/sec2.vue'
import Sec3 from '../components/home/Sec3.vue'
import Sec4 from '../components/home/Sec4.vue'

export default defineComponent({
    name: 'Home',
    components: {
        Sec2,
        Sec3,
        Sec4,
    }
})
</script>

<template>
    <section>
        <div class="container">
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
        <Sec4/>
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
    font-weight: 600;
}
.sub-title{
    font-size: 40px;
    margin: 0; 
    text-transform: capitalize;
    color: #062C43;    
}
</style>