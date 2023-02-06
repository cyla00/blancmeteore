<script>
import { defineComponent } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '../i18n'

export default defineComponent({
    name: 'Header',
    data(){
        return{
            supportLocales: supportLocales,
        }
    },
    setup(){
        const { locale } = useI18n({ useScope: 'global' })
        watch(locale, (val) => {
            setI18nLanguage(val)
        })
        return{
            locale
        }
    },
})
</script>

<template> 
    <header>
        <nav>
            <div class="logo-wrapper">
                <router-link to="/login"><img src="" alt="logo"></router-link>
            </div>

            <div class="links-wrapper">
                <router-link class="path-link" to="/accompagnement-digital">{{$t('header.acc')}}</router-link>
                <router-link class="path-link" to="/identite-graphique">{{$t('header.graph')}}</router-link>
                <router-link class="path-link" to="/sites">{{$t('header.sites')}}</router-link>
            </div>

            <div class="connection-wrapper">
                <router-link class="" to="/login">{{$t('header.connection')}}</router-link>
            </div>
            
            <div class="lang-wrapper">
                <select v-model="locale">
                    <option value="fr">fr</option>
                    <option value="en">en</option>
                </select>
                <!-- <div class="dropdown">
                    <img class="lang-btn" src="@/assets/france.png" alt="" @click="locale = 'fr'">
                    <img class="lang-btn" src="@/assets/uk.png" alt="" @click="locale = 'en'">
                </div> -->
            </div>
        </nav> 
    </header>
    
</template>

<style scoped>
header{
    position: sticky;
    margin: 20px 50px;
    padding: 10px;
    background: #ffffff;
    border-radius: 100px;
}
nav{
    width: 100%;
    display: flex;
}
.logo-wrapper, .links-wrapper, .lang-wrapper{
    margin: auto;
}
a{
    margin-left: 10px;
}
</style>