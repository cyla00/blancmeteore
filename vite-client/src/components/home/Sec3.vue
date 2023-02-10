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
                    <h1 class="title">{{$t('home.sec3.title')}}</h1>
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
    position: relative;
    background: #EFEDF2;
    padding-block: 100px;
    color: #062C43;
}

.title-wrapper{
    text-align: center;
}

.partners-wrapper{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
}
.partner-logo{
    margin: auto;
    width: 100px;
}
.wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin: 20px auto;
    min-width: 100%;
}

.title{
    font-size: 40px;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 50px;
}
</style>