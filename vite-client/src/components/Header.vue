<script lang='ts'>
import { defineComponent } from 'vue'
import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
import Tr from "@/i18n/translation"

export default defineComponent({
    name: 'Header',
    components: { 
        LanguageSwitcher 
    },
    data(){
        return{
            isLogged: false,
            mobile: false,
            scrollPosition: false,
            mobileNav: false,
            windowWidth: 0,
        }
    },
    methods:{
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav
        },
        checkScreen(){
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 1065){
                this.mobile = true      
                return
            }
            this.mobile = false
            this.mobileNav = false
            return
        },
        updateScroll(){
            const scroll = window.scrollY
            if(scroll > 55){
                this.scrollPosition = true
                return
            }
            this.scrollPosition = false
            return
        }
    },
    created(){
        this.checkScreen()
        window.addEventListener('resize', this.checkScreen)
        window.addEventListener('scroll', this.updateScroll)
    }
})
</script>

<template>
    <header :class="{'scrolled-desktop-nav': scrollPosition, 'mobile-header': mobile}">
        <nav class="desktop-nav" v-if="!mobile">
            <div class="logo-wrapper">
                <router-link to="/"><img class="logo" src="https://via.placeholder.com/150x40" alt="company logo"></router-link>
            </div>

            <div class="links-wrapper">
                <router-link class="path-link" to="/accompagnement-digital">{{$t('header.acc')}}</router-link>
                <router-link class="path-link" to="/identite-graphique">{{$t('header.graph')}}</router-link>
                <router-link class="path-link" to="/sites">{{$t('header.sites')}}</router-link>
            </div>

            <div class="connection-wrapper">
                <router-link class="conn-btn" to="/login" v-if="!isLogged">{{$t('header.connection')}}<i class='bx bx-log-in-circle'></i></router-link>
                <router-link class="conn-btn" to="/user-dash" v-if="isLogged">{{$t('header.dashboard')}}<i class='bx bx-user'></i></router-link>
            </div>
            <div class="lang-wrapper">
                <LanguageSwitcher></LanguageSwitcher>
            </div>
        </nav>

        <nav class="mobile-nav" v-if="mobile">
            <div class="logo-wrapper-mobile">
                <router-link to="/"><img class="logo-mobile" src="https://via.placeholder.com/150x40" alt="company logo"></router-link>
            </div>
            <div class="menu-btn-wrapper">
                <img class="menu-img" @click="toggleMobileNav" src="@/assets/meteorite.png" alt="mobile navigation menu button" :class="{'icon-active': mobileNav}">
            </div>
        </nav>
    </header>
</template>

<style scoped>
header{
    background: #ffffff;
    position: sticky;
    border-radius: 100px;
    margin: 20px 40px;
    padding: 10px 40px;
    transition: 0.1s ease all;
    top: 0;
    z-index: 99;
    font-size: 15px;
    font-family: AvenirBold;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.scrolled-desktop-nav{
    transition: 0.1s ease all;
    margin: 0;
    border-radius: 0;
}
.desktop-nav{
    display: flex;
    flex-direction: row;
    margin: auto;
}
.logo-wrapper{
    margin: auto 0;
}
.logo{
    transition: 0.2s ease all;
    vertical-align: middle;
}
.logo:hover{
    transition: 0.2s ease all;
    opacity: 80%;
}
.links-wrapper{
    margin: auto;
}
.connection-wrapper{
    margin: auto 0;
}
.conn-btn{
    padding: 8px 20px;
    background: #4db3af;
    border-radius: 100px;
    color: #ffffff;
}
.lang-wrapper{
    margin: auto 0;
}
a{
    text-decoration: none;
    margin-right: 20px;
    color: #062C43;
}
a:hover{
    transition: 0.2s ease all;
    opacity: 80%;
}
i{
    vertical-align: middle;
    margin-left: 5px;
}


.mobile-header{
    margin: 0 0 10px 0;
    border-radius: 0;
}
.mobile-nav{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.logo-wrapper-mobile{
    margin: auto;
}
.logo-mobile{
    vertical-align: middle;
}
.menu-btn-wrapper{
    width: 100%;
    margin: auto;
    justify-self: flex-end;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
}
.menu-img{
    width: 30px;
    vertical-align: middle;
    transition: 0.3s ease all;
}
.icon-active{
    transform: rotate(180deg);
}



</style>