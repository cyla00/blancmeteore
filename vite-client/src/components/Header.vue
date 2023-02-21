<script lang='ts'>
import { defineComponent } from 'vue'
import LanguageSwitcher from "@/components/LanguageSwitcher.vue"
import axios from 'axios'
import jwt_decode from "jwt-decode"

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
            showLogoutForm: false,
            dashboardPath: ''
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
            if(scroll > 60){
                this.scrollPosition = true
                return
            }
            this.scrollPosition = false
            return
        },
        logout(){
            if(confirm('Deconnection?')){
                localStorage.removeItem('token')
                this.isLogged = false
                return this.$router.push('/login')
            }
            return
        }
    },
    async created(){
        await this.checkScreen()
        window.addEventListener('resize', this.checkScreen)
        window.addEventListener('scroll', this.updateScroll)

        if(localStorage.getItem('token')){
            const auth = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            await axios.post('http://localhost:3000/api/jwt-check', {}, auth).then((res) => {
                if(res.status === 200) {
                    const token_role:any = jwt_decode(localStorage.getItem('token'))
                    this.dashboardPath = `${token_role.role}-dash`
                    return this.isLogged = true
                }
            }).catch((err) => {
                localStorage.clear()
                this.isLogged = false
                window.location.href = '/login'
            })
        }
    }
})
</script>

<template>
    <header :class="{'scrolled-desktop-nav': scrollPosition, 'mobile-header': mobile}">



        <Teleport to="body">
            <div v-if="showLogoutForm" class="modal">
                <p>{{$t('header.deconnection')}}</p>
                <button @click="open = false">Close</button>
            </div>
        </Teleport>


        <nav class="desktop-nav" v-if="!mobile">
            <div class="logo-wrapper">
                <router-link to="/"><img class="logo" src="@/assets/logo.png" alt="company logo"></router-link>
            </div>

            <div class="links-wrapper">
                <router-link class="path-link" to="/accompagnement-digital">{{$t('header.acc')}}</router-link>
                <router-link class="path-link" to="/identite-graphique">{{$t('header.graph')}}</router-link>
                <router-link class="path-link" to="/sites">{{$t('header.sites')}}</router-link>
            </div>

            <div class="connection-wrapper">
                <router-link class="conn-btn" to="/login" v-if="!isLogged">{{$t('header.connection')}}<i class='bx bx-log-in-circle'></i></router-link>
                <router-link class="conn-btn" :to="dashboardPath" v-if="isLogged">{{$t('header.dashboard')}}<i class='bx bx-user'></i></router-link>
                <router-link class="conn-btn logout" to="/user-dash" v-if="isLogged" @click="logout"><i class='bx bx-log-out-circle'></i></router-link>
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
    background: rgba(255, 255, 255, 0.8);
    position: sticky;
    border-radius: 100px;
    margin: 1% 2%;
    padding: 10px 20px;
    transition: 0.1s ease all;
    top: 0;
    z-index: 80;
    font-size: 15px;
    font-family: Inter;
    font-weight: 300;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.scrolled-desktop-nav{
    background: #ffffff;
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
    width: 120px;
}
.logo:hover{
    transition: 0.2s ease all;
    opacity: 50%;
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
    vertical-align: middle;
}
.lang-wrapper{
    margin: auto 0;
}
a{
    text-decoration: none;
    margin-right: 20px;
    color: #000;
}
a:hover{
    transition: 0.2s ease all;
    opacity: 50%;
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

.logout{
    color: #FF605C;
    background: none;
    padding: 5px;
    font-size: 30px;
}

.modal{
    position: fixed;

}

</style>