<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sec2',
})
</script>

<template>
    <section>
        <h1 class="main-title">{{$t('home.sec2.title')}}</h1>
        <h3 class="main-sub-title">{{$t('home.sec2.sub-title')}}</h3>
        <div class="card-wrapper">

            <div class="card">
                <h3 class="card-title">{{$t('header.acc')}}</h3>
                <img class="icon" src="@/assets/meteorite.png" alt="">
                <p class="card-text">{{$t('home.sec2.card-descr-acc')}}</p>
                <router-link class="path-link" to="/accompagnement-digital">{{$t('home.sec2.card-btn')}}</router-link>
            </div>

            <div class="card">
                <h3 class="card-title">{{$t('header.graph')}}</h3>
                <img class="icon" src="@/assets/meteorite.png" alt="">
                <p class="card-text">{{$t('home.sec2.card-descr-grpah')}}</p>
                <router-link class="path-link" to="/identite-graphique">{{$t('home.sec2.card-btn')}}</router-link>
            </div>

            <div class="card">
                <h3 class="card-title">{{$t('header.sites')}}</h3>
                <img class="icon" src="@/assets/meteorite.png" alt="">
                <p class="card-text">{{$t('home.sec2.card-descr-sites')}}</p>
                <router-link class="path-link" to="/sites">{{$t('home.sec2.card-btn')}}</router-link>
            </div>

        </div>
    </section>
</template>

<style scoped>
section{
    padding-top: 100px;
    background: #062C43;
    color: #ffffff;
    text-align: center;
    display: block;
    justify-content: center;
}
.main-title{
    font-family: AvenirBold;
    font-size: 62px;
    text-transform: uppercase;
    margin-block: 0;
}
.main-sub-title{
    font-size: 20px;
    margin-top: 0;
    text-transform: uppercase;
}

.card-wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 100px 0;
}
.card{
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    margin: auto;
    padding: 10px 20px;
    height: 500px;
    width: 300px;
    text-align: center;
    background: #ffffff;
    color: #062C43;
    border-radius: 20px;
}
.card-title{
    font-size: 20px;
    font-family: AvenirBold;
}
.card-text{
    margin: auto;
}
.icon{
    margin: auto;
}
.path-link{
    text-decoration: none;
    padding: 8px 20px;
    background: #4db3af;
    border-radius: 100px;
    color: #ffffff;
    margin: auto;
}
.path-link:hover{
    transition: 0.2s ease all;
    opacity: 80%;
}
</style>







                