<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sec3',
})
</script>

<template>
    <section>
        <div class="container">
            <div class="content-wrapper">
                <div class="title-wrapper">
                    <h1>{{$t('home.sec3.title')}}</h1>
                    <h3>{{$t('home.sec3.sub-title')}}</h3>
                </div>
                <div class="partners-wrapper">
                    <img class="partner-logo" src="@/assets/meteorite.png" alt="">
                    <img class="partner-logo" src="@/assets/meteorite.png" alt="">
                    <img class="partner-logo" src="@/assets/meteorite.png" alt="">
                    <img class="partner-logo" src="@/assets/meteorite.png" alt="">
                    <img class="partner-logo" src="@/assets/meteorite.png" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>


section{
    /* padding-block: 100px; */
    position: relative;
    background: #EFEDF2;
}
.title-wrapper{
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 2%;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
}
.partners-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.partner-logo{
    background: #EFEDF2;
    margin: auto;
    width: 50px;
}
</style>