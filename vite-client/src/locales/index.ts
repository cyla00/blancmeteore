import { createI18n } from "vue-i18n"
import fr from './fr.json' assert { type: "json" }
import en from './en.json' assert { type: "json" }

const messages = {
    fr,
    en
}


export default createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  legacy: false,
  messages,
})
