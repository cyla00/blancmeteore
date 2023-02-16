<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sec4',
    data(){
        return{
            insta: '+ 5000',
            face: '+ 2500',
            creations: '270',
            video: '85'
        }
    }
    
})
</script>

<template>
    <section>
        <div class="team-wrapper">
            <div class="text-wrapper">
                <h3>{{$t('home.sec4.title')}}</h3>
                <p>{{$t('home.sec4.sub-title')}}</p>
            </div>
            <div class="img-wrapper">
                <img class="team-img" src="@/assets/team.png" alt="">
            </div>
        </div>

        <h1 class="title">{{$t('home.sec4.title')}}</h1>
        <div class="stats-wrapper">
            <div class="card">
                <h4>{{insta}}</h4>
                <p>{{$t('home.sec4.insta')}}</p>
            </div>

            <div class="card">
                <h4>{{face}}</h4>
                <p>{{$t('home.sec4.facebook')}}</p>
            </div>

            <div class="card">
                <h4>{{creations}}</h4>
                <p>{{$t('home.sec4.crea')}}</p>
            </div>

            <div class="card">
                <h4>{{video}}</h4>
                <p>{{$t('home.sec4.video')}}</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
section{
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #EFEDF2;
    text-align: center;
    color: #062C43;
}

.team-wrapper{
    width: 50%;
    border-radius: 30px;
    display: flex;
    margin: auto;
    flex-direction: row;
    justify-content: center;
    padding: 2% 4%;
    text-align: start;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.text-wrapper{
    margin: auto 50px;
}

.team-img{
    width: 600px;
}

.stats-wrapper{
    display: flex;
    flex-direction: row;
    margin-block: 100px;
}

.card{
    margin: auto;
    width: 15rem;
    height: 5rem;
    padding: 2%;
    border-radius: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    text-align: start;
}

.card h4{
    font-size: 42px;
    margin: 0 auto;
}
.card p{
    font-size: 15px;
}
</style>
