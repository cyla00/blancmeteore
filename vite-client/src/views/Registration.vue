<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Popup from '../components/Popup.vue'

export default defineComponent({
    name: 'Registration',
    components: {
        Popup,
    },
    data(){
        return{
            input_first_name: '',
            input_last_name: '',
            input_email: '',
            input_password: '',
            input_repeat_password: '',
            conditions: false,
            show: false,
            errMsg: '',
            succMsg: '',
        }
    },
    methods: {
        async registration(){

            if(this.input_first_name === '' || this.input_last_name === '' || this.input_email === '' || this.input_password === '' || this.input_repeat_password === ''){
                this.show = true
                this.errMsg = 'remplir tous les champs'
                return
            }

            if(this.input_password != this.input_repeat_password){
                this.show = true
                this.errMsg = 'Les mots de passe ne correspondent pas'
                return
            }

            if(!this.conditions){
                this.show = true
                this.errMsg = 'accepter les termes et conditions'
                return
            }

            const body = {
                'email': this.input_email,
                'password': this.input_password,
                'firstname': this.input_first_name,
                'lastname': this.input_last_name
            }

            await axios.post('http://localhost:3000/api/registration', body, {}).then((res) => {
                if(res.status === 200){
                    this.show = true
                    this.succMsg = res.data.SuccMsg
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                    return
                }
            }).catch((e) => {
                console.log(e)
                this.show = true
                this.errMsg = e.response.data.ErrMsg
                return
            })
        }
    }
})
</script>

<template>
    <section>
        <Popup v-model:Show="show" v-model:ErrMsg="errMsg" v-model:SuccMsg="succMsg" />
        <div class="form-wrapper">
            <div class="image">
                <img class="illustration" src="@/assets/login.png" alt="login connection image">
            </div>
            <div class="form">
                <h3 class="form-title">{{$t('registration.title')}}</h3>
                <label for="first-name">{{$t('registration.first_name')}}</label>
                <input type="text" name="first-name" v-model="input_first_name">

                <label for="last-name">{{$t('registration.last_name')}}</label>
                <input type="text" name="last-name" v-model="input_last_name">

                <label for="registration-email">{{$t('registration.email')}}</label>
                <input type="email" name="registration-email" v-model="input_email">

                <label for="registration-password">{{$t('registration.password')}}</label>
                <input type="password" name="registration-password" v-model="input_password">

                <label for="registration-repeat-password">{{$t('registration.repeat_password')}}</label>
                <input type="password" name="registration-repeat-password" v-model="input_repeat_password">
                <button class="submit" @click="registration">{{$t('registration.submit')}}</button>

                <div class="login-wrapper">
                    <input type="checkbox" v-model="conditions">
                    <p class="login-fallback">{{$t('registration.conditions')}}</p>
                    <router-link class="login-fallback-url" to="/politique-confidentialite">&nbsp;{{$t('registration.conditions-url')}}</router-link>
                </div>

                <div class="login-wrapper">
                    <p class="login-fallback">{{$t('registration.login-fallback')}}</p>
                    <router-link class="login-fallback-url" to="/login">&nbsp;{{$t('registration.login-fallback-url')}}</router-link>
                </div>
                
            </div>
        </div>
    </section>
</template>

<style scoped>
section{
    display: flex;
    justify-content: center;
    height: 90vh;
    transition: 0.2s ease all;
}
.form-wrapper{
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    margin: auto;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.form{
    margin: auto;
    display: flex;
    flex-direction: column;
}
input{
    font-size: 20px;
    padding: 5px 20px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    transition: 0.2s ease all;
    text-align: center;
}
input:focus{
    border: 1px solid #4db3af;
}
.login-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 15px;
}
.login-fallback{
    margin: 0;
}
.login-fallback-url{
    text-decoration: none;
    color: #4db3af;
}
.login-fallback-url:hover{
    transition: 0.2s ease all;
    color: #062C43;
}
.submit{
    margin: auto;
}
.image{
    margin: auto;
    background: #062C43;
    border-radius: 20px 0 0 20px;
}
.illustration{
    width: 600px;
}
</style>
