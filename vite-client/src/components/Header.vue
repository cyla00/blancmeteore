<script lang='ts'>
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Trans from "@/locales/translation"

export default defineComponent({
    name: 'Header',
    data(){
        return{
            locale: null
        }
    },
    setup() {
        const { t, locale } = useI18n()
        const supportedLocales = Trans.supportedLocales
        const switchLanguage = async (event) => {
            const newLocale = event.target.value
            await Trans.switchLanguage(newLocale)
        }
        return { t, locale, supportedLocales, switchLanguage }
    }
})
</script>

<template>
    <header>
        <nav>
            <div class="lang-wrapper">
                <select v-model="locale">
                    <option value="fr">fr</option>
                    <option value="en">en</option>
                </select>
            </div>
        </nav>
    </header>
</template>

<style scoped>

</style>