import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import loginIt from "./locales/it/login.json"
import loginEn from "./locales/en/login.json"
import loginAgentIt from "./locales/it/loginAgent.json"
import loginAgentEn from "./locales/en/loginAgent.json"
import registerIt from "./locales/it/register.json"
import registerEn from "./locales/en/register.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            it: {
                login: loginIt,
                loginAgent: loginAgentIt,
                register: registerIt,
            },
            en: {
                login: loginEn,
                loginAgent: loginAgentEn,
                register: registerEn,
            }
        },
        lng: "it",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })

export default i18n