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

                    <div class="wrapper">
                        <img class="partner-logo" src="@/assets/logo1.png" alt="">
                        <img class="partner-logo" src="@/assets/logo2.png" alt="">
                        <img class="partner-logo" src="@/assets/logo3.png" alt="">
                        <img class="partner-logo" src="@/assets/logo4.png" alt="">
                        <img class="partner-logo" src="@/assets/logo5.png" alt="">
                    </div>

                    <div class="wrapper">
                        <img class="partner-logo" src="@/assets/logo6.png" alt="">
                        <img class="partner-logo" src="@/assets/logo7.png" alt="">
                        <img class="partner-logo" src="@/assets/logo8.png" alt="">
                        <img class="partner-logo" src="@/assets/logo9.png" alt="">
                        <img class="partner-logo" src="@/assets/logo10.png" alt="">
                    </div>

                    <div class="wrapper">
                        <img class="partner-logo" src="@/assets/logo11.png" alt="">
                        <img class="partner-logo" src="@/assets/logo12.png" alt="">
                        <img class="partner-logo" src="@/assets/logo13.png" alt="">
                        <img class="partner-logo" src="@/assets/logo14.png" alt="">
                        <img class="partner-logo" src="@/assets/logo15.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>


section{
    height: 100vh;
    /* padding-block: 100px; */
    position: relative;
    display: flex;
    justify-content: center;
    background: #EFEDF2 !important;
}

.content-wrapper{
    
}

.title-wrapper{
    text-align: center;
}

.partners-wrapper{
    display: grid;
    width: 100vw;
    grid-template-rows: 1fr 1fr 1fr;
}
.partner-logo{
    margin: auto;
    vertical-align: middle;
    width: 90px;
}
.wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100vw;
    margin: 20px auto;
}
</style>