<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'

export default defineComponent({
    name: 'Sec4',
    data(){
        return{
            insta: 5000,
            face: 2500,
            creations: 300,
            video: 95,
            finished: false,
        }
    },
    setup(){
        const target = ref(null)
        const isVisible = useElementVisibility(target)

        return {
            target,
            isVisible,
        }
    },
    methods: {
        theFormat(number:number) {
            return number.toFixed(2);
        },
        completed() {
            console.log('Animation ends!');
        },
    },
    watch: {
        isVisible(event){
            if(event && !this.finished){
                this.$refs.instaCounter?.start()
                this.$refs.faceCounter?.start()
                this.$refs.creaCounter?.start()
                this.$refs.videoCounter?.start()       
            }
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
        <div class="stats-wrapper" ref="target">
            <div class="card">
                <span class="number">+</span><vue3-autocounter class="number" ref='instaCounter' :startAmount='0' separator='' :endAmount='insta' :duration='2' :autoinit='false' @finished="finished = true"/>
                <i class='bx bxl-instagram-alt bx-md'></i>
                <p>{{$t('home.sec4.insta')}}</p>
            </div>

            <div class="card">
                <span class="number">+</span><vue3-autocounter class="number" ref='faceCounter' :startAmount='0' separator='' :endAmount='face' :duration='2' :autoinit='false' @finished="finished = true"/>
                <i class='bx bxl-facebook-circle bx-md'></i>
                <p>{{$t('home.sec4.facebook')}}</p>
            </div>

            <div class="card">
                <span class="number">+</span><vue3-autocounter class="number" ref='creaCounter' :startAmount='0' separator='' :endAmount='creations' :duration='2' :autoinit='false' @finished="finished = true"/>
                <i class='bx bxs-palette bx-md'></i>
                <p>{{$t('home.sec4.crea')}}</p>
            </div>

            <div class="card">
                <span class="number">+</span><vue3-autocounter class="number" ref='videoCounter' :startAmount='0' separator='' :endAmount='video' :duration='2' :autoinit='false' @finished="finished = true"/>
                <i class='bx bxs-videos bx-md'></i>
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
    /* width: 50%; */
    border-radius: 30px;
    display: flex;
    margin: 100px auto;
    flex-direction: row;
    justify-content: center;
    padding: 2% 4%;
    text-align: start;
    background: none;
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; */
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
    margin-bottom: 100px;
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

.number{
    font-size: 42px;
    margin: 0 auto;
}
.card p{
    font-size: 15px;
}

.title{
    font-size: 40px;
    text-transform: uppercase;
}
</style>
